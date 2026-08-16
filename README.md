# TrustList — directory + admin CMS (checkscam-style)

Two things in one Next.js app:

- **Trang chính** (`/`) — danh sách admin/shop dạng lưới + trang hồ sơ từng
  người (`/[slug]`), giống `admin.checkscam.vn`.
- **Trang quản trị** (`/admin`) — đăng nhập bằng mật khẩu, thêm / sửa / xoá
  hồ sơ (tên, ảnh, điểm tín nhiệm, dịch vụ, tài khoản ngân hàng...).

## 1. Chạy thử ở local

```bash
npm install
cp .env.example .env
```

Local không cần cài Postgres — sửa `prisma/schema.prisma`, đổi
`provider = "postgresql"` thành `provider = "sqlite"`, và trong `.env` đặt:

```
DATABASE_URL="file:./dev.db"
```

Rồi chạy:

```bash
npm run db:push     # tạo bảng
npm run db:seed      # thêm dữ liệu mẫu (Trần Ngọc Thu...)
npm run dev
```

Mở http://localhost:3000 cho trang chính, http://localhost:3000/admin cho
trang quản trị (mật khẩu = giá trị `ADMIN_PASSWORD` trong `.env`).

**Nhớ đổi lại `provider = "postgresql"` trước khi deploy lên Vercel**, vì
SQLite không lưu được trên môi trường serverless của Vercel.

## 2. Deploy lên Vercel

1. Push code này lên một repo GitHub.
2. Trên Vercel: **Add New → Project**, import repo.
3. Tạo database: tab **Storage → Create Database → Postgres** (Neon, miễn
   phí) ngay trong project Vercel — nó tự thêm biến `DATABASE_URL`.
4. Vào **Settings → Environment Variables**, thêm thêm 2 biến:
   - `ADMIN_PASSWORD` — mật khẩu đăng nhập trang quản trị.
   - `ADMIN_SECRET` — một chuỗi ngẫu nhiên dài bất kỳ (dùng để ký cookie).
5. Deploy. Sau lần deploy đầu tiên, vào tab **Storage → (database) → Query**
   hoặc chạy cục bộ:
   ```bash
   DATABASE_URL="<connection string từ Vercel>" npx prisma db push
   DATABASE_URL="<connection string từ Vercel>" npm run db:seed
   ```
   để tạo bảng và (tuỳ chọn) thêm dữ liệu mẫu.
6. Truy cập `your-project.vercel.app/admin/login` để đăng nhập và bắt đầu
   thêm hồ sơ thật.

## Ghi chú

-  Ảnh đại diện được chọn hoặc kéo-thả trực tiếp trong trang quản trị (PNG,
  JPG, WEBP hoặc GIF; tối đa 1 MB). Ảnh được lưu cùng dữ liệu hồ sơ nên không
  cần cấu hình dịch vụ lưu file riêng.
- Đăng nhập quản trị dùng cookie ký bằng `ADMIN_SECRET`, không có tài khoản
  nhiều người dùng — phù hợp cho 1 quản trị viên. Cần nhiều tài khoản thì
  nên thêm bảng `AdminUser` + hash mật khẩu (scrypt/bcrypt).
- Đây là công cụ xây **trang xác minh/uy tín cộng đồng** — hãy đảm bảo
  thông tin đăng lên là chính xác và có sự đồng ý của người liên quan.
