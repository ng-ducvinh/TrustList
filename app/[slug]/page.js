import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseBankAccounts, parseServices } from "@/lib/data";
import TopBar from "../components/TopBar";
import ProfileWarningModal from "../components/ProfileWarningModal";

export const dynamic = "force-dynamic";

function getFacebookId(url) {
  try {
    const parsed = new URL(url);
    const queryId = parsed.searchParams.get("id");
    if (queryId) return queryId;

    return parsed.pathname.split("/").filter(Boolean).at(-1) || url;
  } catch {
    return url;
  }
}

export async function generateMetadata({ params }) {
  const person = await prisma.person.findUnique({ where: { slug: params.slug } });
  if (!person) return {};
  return { title: `${person.name} — TrustList` };
}

export default async function ProfilePage({ params }) {
  const person = await prisma.person.findUnique({
    where: { slug: params.slug },
  });

  if (!person) notFound();

  const bankAccounts = parseBankAccounts(person.bankAccounts);
  const services = parseServices(person.services);

  return (
    <>
      <TopBar />

      <ProfileWarningModal />

      <section className="profile-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="profile-avatar"
          src={person.avatarUrl || "/avatar-placeholder.svg"}
          alt={person.name}
        />
        <h1>{person.name}</h1>
        {person.telegramUrl && (
          <a
            className="telegram-btn"
            href={person.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 4L2.5 11.3c-1 .4-1 1.9.1 2.2l4.6 1.4 1.8 5.6c.3 1 1.6 1.2 2.3.4l2.5-2.8 4.7 3.5c.9.6 2.1.1 2.3-1l3-16.7c.2-1.2-1-2.1-2.2-1.6z"
                fill="#fff"
              />
            </svg>
            Cộng đồng check
          </a>
        )}
      </section>

      <div className="cards-row">
        <div className="info-card">
          <h3>Thông tin xác minh</h3>
          {person.facebookUrl && (
            <div className="info-row">
              <strong>Facebook:</strong>
              <a href={person.facebookUrl} target="_blank" rel="noopener noreferrer">
                {getFacebookId(person.facebookUrl)}
              </a>
            </div>
          )}
          {person.shopBioUrl && (
            <div className="info-row">
              <strong>Bio Shop:</strong>
              <a href={person.shopBioUrl} target="_blank" rel="noopener noreferrer">
                Xem shop
              </a>
            </div>
          )}
          {!person.facebookUrl && !person.shopBioUrl && (
            <div className="info-row">Chưa cập nhật.</div>
          )}
        </div>

        <div className="info-card trust">
          <h3>Hồ sơ hạng {person.profileTier || "Đồng"}</h3>
          <div className="info-row">
            <strong>Hỗ trợ:</strong> {person.supportLevel}
          </div>
          <div className="info-row">
            <strong>Điểm tín nhiệm:</strong>{" "}
            <span className="trust-value">
              {person.trustScore}/{person.trustScoreMax}
            </span>
          </div>
          {person.joinDate && (
            <div className="info-row">
              <strong>Ngày tham gia:</strong> {person.joinDate}
            </div>
          )}
          <div className="info-row">
            <strong>Khuyến nghị giao dịch:</strong> {person.transactionLimit}
          </div>
        </div>
      </div>

      <div className="section-panel">
        <div className="panel-box">
          <h3>Dịch vụ cung cấp</h3>
          {services.length > 0 ? (
            <ul className="services-list">
              {services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="field-hint">Chưa cập nhật dịch vụ.</p>
          )}

          {bankAccounts.length > 0 && (
            <>
              <div className="bank-title">Chủ tk "{person.name}"</div>
              <div className="bank-list">
                {bankAccounts.map((b, i) => (
                  <div className="bank-item" key={i}>
                    <span>{b.bank}</span>
                    <span className="num mono">{b.account}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <p className="footer-note">
        Hồ sơ được cộng đồng xác minh — vẫn nên kiểm tra chéo trước giao dịch
        giá trị lớn.
      </p>
    </>
  );
}
