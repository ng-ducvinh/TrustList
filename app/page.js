import Link from "next/link";
import { prisma } from "@/lib/prisma";
import TopBar from "./components/TopBar";

export const dynamic = "force-dynamic";

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0111/g, "d")
    .replace(/\u0110/g, "d")
    .toLowerCase()
    .trim();
}

function matchesSearch(person, query) {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const searchableText = normalizeSearchText(`${person.name} ${person.services}`);
  return terms.every((term) => searchableText.includes(term));
}

export default async function HomePage({ searchParams }) {
  const q = (searchParams?.q || "").trim();

  const people = await prisma.person.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  const matchingPeople = q ? people.filter((person) => matchesSearch(person, q)) : people;

  return (
    <>
      <TopBar />

      <section className="hero">
        <div className="hero-badge">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l8 3.5v5.4c0 5-3.4 8.9-8 10.1-4.6-1.2-8-5.1-8-10.1V5.5L12 2z"
              fill="#fff"
              fillOpacity="0.16"
            />
            <path
              d="M12 2l8 3.5v5.4c0 5-3.4 8.9-8 10.1-4.6-1.2-8-5.1-8-10.1V5.5L12 2z"
              stroke="#fff"
              strokeWidth="1.6"
            />
            <path
              d="M9 12l2 2 4-4.5"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1>Danh sách admin &amp; shop uy tín</h1>
        <p>
          Tra cứu hồ sơ xác minh trước khi giao dịch. Mỗi admin trong danh
          sách đã được kiểm tra thông tin và gắn điểm tín nhiệm.
        </p>
        <form className="search-wrap" action="/" method="get">
          <input
            type="text"
            name="q"
            placeholder="Tìm admin, dịch vụ..."
            defaultValue={q}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M21 21l-4.3-4.3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </form>
      </section>

      <div className="container" style={{ paddingBottom: 64 }}>
        <div className="directory-panel">
          {matchingPeople.length === 0 ? (
            <div className="empty-state">
              {q
                ? `Không tìm thấy admin nào khớp với "${q}".`
                : "Chưa có admin nào trong danh sách."}
            </div>
          ) : (
            <div className="grid">
              {matchingPeople.map((p, i) => (
                <Link key={p.id} href={`/${p.slug}`} className="person-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="avatar"
                    src={p.avatarUrl || "/avatar-placeholder.svg"}
                    alt={p.name}
                  />
                  <span className="person-name">
                    <span className="person-rank">{i + 1}.</span> {p.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="footer-note">
        TrustList là danh mục xác minh cộng đồng — luôn tự kiểm tra kỹ trước
        khi chuyển khoản hoặc giao dịch giá trị lớn.
      </p>
    </>
  );
}
