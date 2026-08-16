import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isLoggedIn } from "@/lib/auth";
import { deletePersonAction, logoutAction } from "@/lib/actions";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminDashboard() {
  const ok = await isLoggedIn();
  if (!ok) redirect("/admin/login");

  const people = await prisma.person.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div>
          <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Quản trị TrustList</h1>
          <p style={{ margin: "4px 0 0", color: "var(--ink-soft)", fontSize: "0.88rem" }}>
            {people.length} hồ sơ trong danh sách
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/" className="btn">Xem trang chính</Link>
          <Link href="/admin/new" className="btn btn-primary">+ Thêm admin</Link>
          <form action={logoutAction}>
            <button type="submit" className="btn">Đăng xuất</button>
          </form>
        </div>
      </div>

      {people.length === 0 ? (
        <div className="empty-state">Chưa có hồ sơ nào. Bấm "Thêm admin" để tạo mới.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th></th>
                <th>Tên</th>
                <th>Slug</th>
                <th>Hạng</th>
                <th>Tín nhiệm</th>
                <th>Hỗ trợ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="row-avatar"
                      src={p.avatarUrl || "/avatar-placeholder.svg"}
                      alt={p.name}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td className="mono" style={{ color: "var(--ink-soft)" }}>/{p.slug}</td>
                  <td>{p.profileTier || "Bạc"}</td>
                  <td>{p.trustScore}/{p.trustScoreMax}</td>
                  <td>{p.supportLevel}</td>
                  <td>
                    <div className="actions-cell">
                      <Link href={`/${p.slug}`} className="btn" target="_blank">Xem</Link>
                      <Link href={`/admin/${p.id}/edit`} className="btn">Sửa</Link>
                      <form
                        action={async () => {
                          "use server";
                          await deletePersonAction(p.id);
                        }}
                      >
                        <button type="submit" className="btn btn-danger">Xoá</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
