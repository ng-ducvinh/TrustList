import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import { createPersonAction } from "@/lib/actions";
import PersonForm from "../PersonForm";

export default async function NewPersonPage() {
  const ok = await isLoggedIn();
  if (!ok) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <h1 style={{ margin: 0, fontSize: "1.4rem" }}>Thêm admin mới</h1>
      </div>
      <PersonForm action={createPersonAction} />
    </div>
  );
}
