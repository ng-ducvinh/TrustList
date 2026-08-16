import { redirect, notFound } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updatePersonAction } from "@/lib/actions";
import { parseBankAccounts } from "@/lib/data";
import PersonForm from "../../PersonForm";

export default async function EditPersonPage({ params }) {
  const ok = await isLoggedIn();
  if (!ok) redirect("/admin/login");

  const person = await prisma.person.findUnique({ where: { id: params.id } });
  if (!person) notFound();

  const boundAction = async (formData) => {
    "use server";
    await updatePersonAction(person.id, formData);
  };

  const initial = {
    ...person,
    bankAccounts: parseBankAccounts(person.bankAccounts),
  };

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Sửa hồ sơ: {person.name}</h1>
      </div>
      <PersonForm action={boundAction} initial={initial} />
    </div>
  );
}
