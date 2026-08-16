import { loginAction } from "@/lib/actions";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function LoginPage({ searchParams }) {
  const error = searchParams?.error;

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="hero-badge" style={{ margin: "0 auto 12px" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="#fff" strokeWidth="1.6" />
            <path d="M8 10V7a4 4 0 018 0v3" stroke="#fff" strokeWidth="1.6" />
          </svg>
        </div>
        <h1>Đăng nhập Quản trị</h1>
        <p>Chỉ dành cho quản trị viên TrustList.</p>

        {error && (
          <div className="error-banner">Sai mật khẩu, vui lòng thử lại.</div>
        )}

        <form action={loginAction}>
          <div className="field">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
