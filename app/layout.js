import "./globals.css";

export const metadata = {
  title: "TrustList — Danh sách admin uy tín",
  description: "Tra cứu và xác minh admin/shop trước khi giao dịch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
