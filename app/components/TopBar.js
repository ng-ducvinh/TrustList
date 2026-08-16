import Link from "next/link";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">
          <span className="brand-mark" aria-label="TrustList logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logotrustlist-header.png" alt="" />
          </span>
          <span className="brand-text">
            TrustList
            <small>XÁC MINH ADMIN &amp; SHOP</small>
          </span>
        </Link>
        <nav className="topbar-links" aria-label="Main navigation">
          <a href="https://zalo.me/trustlist" target="_blank" rel="noreferrer">
            Liên hệ quản lý
          </a>
          <Link href="/noi-quy-giao-dich">Nội quy giao dịch</Link>
        </nav>
      </div>
    </div>
  );
}
