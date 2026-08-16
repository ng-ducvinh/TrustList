"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { slugify } from "./data";
import {
  checkPassword,
  setSessionCookie,
  clearSessionCookie,
  isLoggedIn,
} from "./auth";

async function requireAuth() {
  const ok = await isLoggedIn();
  if (!ok) redirect("/admin/login");
}

export async function loginAction(formData) {
  const password = String(formData.get("password") || "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

function readPersonForm(formData) {
  const bankRaw = String(formData.get("bankAccountsJson") || "[]");
  let bankAccounts = [];
  try {
    bankAccounts = JSON.parse(bankRaw);
    if (!Array.isArray(bankAccounts)) bankAccounts = [];
  } catch {
    bankAccounts = [];
  }

  const avatarUrl = String(formData.get("avatarUrl") || "").trim();
  const isAvatarDataUrl = /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(avatarUrl);
  const isLegacyAvatarUrl = /^https?:\/\/\S+$/i.test(avatarUrl);
  if (
    avatarUrl &&
    ((!isAvatarDataUrl && !isLegacyAvatarUrl) ||
      (isAvatarDataUrl && avatarUrl.length > 1_400_000) ||
      (isLegacyAvatarUrl && avatarUrl.length > 2_048))
  ) {
    throw new Error("Ảnh đại diện không hợp lệ hoặc vượt quá dung lượng cho phép");
  }

  return {
    name: String(formData.get("name") || "").trim(),
    avatarUrl: avatarUrl || null,
    facebookUrl: String(formData.get("facebookUrl") || "").trim() || null,
    shopBioUrl: String(formData.get("shopBioUrl") || "").trim() || null,
    telegramUrl: String(formData.get("telegramUrl") || "").trim() || null,
    supportLevel: String(formData.get("supportLevel") || "Xuất sắc").trim(),
    profileTier: String(formData.get("profileTier") || "Đồng").trim(),
    trustScore: Number(formData.get("trustScore") || 100),
    trustScoreMax: Number(formData.get("trustScoreMax") || 100),
    joinDate: String(formData.get("joinDate") || "").trim() || null,
    transactionLimit:
      String(formData.get("transactionLimit") || "").trim() ||
      "dưới 10 triệu",
    services: String(formData.get("services") || ""),
    bankAccounts: JSON.stringify(bankAccounts),
    order: Number(formData.get("order") || 0),
  };
}

async function syncRanks(id, preferredOrder) {
  const all = await prisma.person.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const targetId = id;
  const current = all.find((person) => person.id === targetId);
  if (!current) return;

  const others = all.filter((person) => person.id !== targetId);
  const targetIndex = Number.isFinite(Number(preferredOrder))
    ? Math.max(0, Math.min(others.length, Number(preferredOrder) - 1))
    : others.length;

  const ordered = [...others];
  ordered.splice(targetIndex, 0, current);

  for (let index = 0; index < ordered.length; index += 1) {
    await prisma.person.update({
      where: { id: ordered[index].id },
      data: { order: index + 1 },
    });
  }
}

export async function createPersonAction(formData) {
  await requireAuth();
  const data = readPersonForm(formData);
  if (!data.name) throw new Error("Tên không được để trống");

  let slug = String(formData.get("slug") || "").trim();
  slug = slug ? slugify(slug) : slugify(data.name);
  if (!slug) slug = `admin-${Date.now()}`;

  const existing = await prisma.person.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now().toString().slice(-5)}`;

  const created = await prisma.person.create({ data: { ...data, slug } });
  await syncRanks(created.id, data.order);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePersonAction(id, formData) {
  await requireAuth();
  const data = readPersonForm(formData);
  if (!data.name) throw new Error("Tên không được để trống");

  let slug = String(formData.get("slug") || "").trim();
  slug = slug ? slugify(slug) : slugify(data.name);

  const conflict = await prisma.person.findFirst({
    where: { slug, NOT: { id } },
  });
  if (conflict) slug = `${slug}-${Date.now().toString().slice(-5)}`;

  await prisma.person.update({ where: { id }, data: { ...data, slug } });
  await syncRanks(id, data.order);
  revalidatePath("/");
  revalidatePath(`/${slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePersonAction(id) {
  await requireAuth();
  await prisma.person.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}
