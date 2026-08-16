"use client";

import { useState } from "react";
import Link from "next/link";

export default function PersonForm({ action, initial }) {
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatarUrl || "");
  const [avatarError, setAvatarError] = useState("");
  const [bankAccounts, setBankAccounts] = useState(
    initial?.bankAccounts?.length
      ? initial.bankAccounts
      : [{ bank: "", account: "" }]
  );

  function updateBank(i, field, value) {
    setBankAccounts((prev) =>
      prev.map((b, idx) => (idx === i ? { ...b, [field]: value } : b))
    );
  }

  function addBank() {
    setBankAccounts((prev) => [...prev, { bank: "", account: "" }]);
  }

  function removeBank(i) {
    setBankAccounts((prev) => prev.filter((_, idx) => idx !== i));
  }

  function selectAvatar(file) {
    setAvatarError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAvatarError("Vui lòng chọn một tệp ảnh.");
      return;
    }

    if (file.size > 1024 * 1024) {
      setAvatarError("Ảnh tối đa 1 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result));
    reader.onerror = () => setAvatarError("Không thể đọc tệp ảnh này.");
    reader.readAsDataURL(file);
  }

  return (
    <form action={action} className="form-card">
      <input
        type="hidden"
        name="bankAccountsJson"
        value={JSON.stringify(bankAccounts.filter((b) => b.bank || b.account))}
      />

      <div className="form-grid">
        <div className="field">
          <label>Tên *</label>
          <input name="name" defaultValue={initial?.name} required />
        </div>
        <div className="field">
          <label>Slug (URL)</label>
          <input name="slug" defaultValue={initial?.slug} placeholder="tự tạo từ tên nếu để trống" />
          <div className="field-hint">Trang hồ sơ sẽ ở /slug</div>
        </div>

        <div className="field">
          <label>Ảnh đại diện</label>
          <input type="hidden" name="avatarUrl" value={avatarUrl} />
          <label
            className="avatar-upload"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              selectAvatar(event.dataTransfer.files?.[0]);
            }}
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(event) => selectAvatar(event.target.files?.[0])}
            />
            {avatarUrl ? (
              <img src={avatarUrl} alt="Xem trước ảnh đại diện" />
            ) : (
              <span>Kéo thả ảnh vào đây hoặc <strong>chọn tệp</strong></span>
            )}
          </label>
          <div className="field-hint">PNG, JPG, WEBP hoặc GIF, tối đa 1 MB.</div>
          {avatarUrl && (
            <button type="button" className="avatar-remove" onClick={() => setAvatarUrl("")}>
              Xóa ảnh
            </button>
          )}
          {avatarError && <div className="field-error">{avatarError}</div>}
        </div>
        <div className="field">
          <label>Link Telegram cộng đồng</label>
          <input name="telegramUrl" defaultValue={initial?.telegramUrl} placeholder="https://t.me/..." />
        </div>

        <div className="field">
          <label>Link Facebook</label>
          <input name="facebookUrl" defaultValue={initial?.facebookUrl} placeholder="https://facebook.com/..." />
        </div>
        <div className="field">
          <label>Zalo</label>
          <input name="zaloUrl" defaultValue={initial?.zaloUrl} placeholder="https://zalo.me/..." />
        </div>
        <div className="field">
          <label>Số điện thoại</label>
          <input name="phoneNumber" type="tel" defaultValue={initial?.phoneNumber} placeholder="VD: 0901234567" />
        </div>
        <div className="field">
          <label>TikTok</label>
          <input name="tiktokUrl" defaultValue={initial?.tiktokUrl} placeholder="https://www.tiktok.com/@..." />
        </div>
        <div className="field">
          <label>Link Bio Shop</label>
          <input name="shopBioUrl" defaultValue={initial?.shopBioUrl} placeholder="https://..." />
        </div>

        <div className="field">
          <label>Mức hỗ trợ</label>
          <select name="supportLevel" defaultValue={initial?.supportLevel || "Xuất sắc"}>
            <option>Xuất sắc</option>
            <option>Tốt</option>
            <option>Khá</option>
            <option>Trung bình</option>
          </select>
        </div>
        <div className="field">
          <label>Hạng hồ sơ</label>
          <select name="profileTier" defaultValue={initial?.profileTier || "Đồng"}>
            <option>Đồng</option>
            <option>Bạc</option>
            <option>Vàng</option>
            <option>Kim cương</option>
          </select>
        </div>
        <div className="field">
          <label>Ngày tham gia</label>
          <input name="joinDate" defaultValue={initial?.joinDate} placeholder="dd/mm/yyyy" />
        </div>

        <div className="field">
          <label>Điểm tín nhiệm</label>
          <input name="trustScore" type="number" min="0" defaultValue={initial?.trustScore ?? 100} />
        </div>
        <div className="field">
          <label>Điểm tối đa</label>
          <input name="trustScoreMax" type="number" min="1" defaultValue={initial?.trustScoreMax ?? 100} />
        </div>

        <div className="field">
          <label>Khuyến nghị giao dịch</label>
          <input name="transactionLimit" defaultValue={initial?.transactionLimit || "dưới 10 triệu"} />
        </div>
        <div className="field">
          <label>Thứ tự hiển thị</label>
          <input name="order" type="number" defaultValue={initial?.order ?? 0} />
        </div>
      </div>

      <div className="field">
        <label>Dịch vụ cung cấp (mỗi dòng một mục)</label>
        <textarea
          name="services"
          rows={5}
          defaultValue={initial?.services}
          placeholder={"Hỗ trợ nhiệt tình, chu đáo 24/24.\nBảo mật thông tin khách hàng tuyệt đối."}
        />
      </div>

      <div className="field">
        <label>Tài khoản ngân hàng</label>
        {bankAccounts.map((b, i) => (
          <div className="bank-editor-row" key={i}>
            <input
              placeholder="Tên ngân hàng (VD: Vietcombank)"
              value={b.bank}
              onChange={(e) => updateBank(i, "bank", e.target.value)}
            />
            <input
              placeholder="Số tài khoản"
              value={b.account}
              onChange={(e) => updateBank(i, "account", e.target.value)}
            />
            <div />
            <button type="button" className="btn btn-danger" onClick={() => removeBank(i)}>
              Xoá
            </button>
          </div>
        ))}
        <button type="button" className="btn" onClick={addBank}>
          + Thêm tài khoản
        </button>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Lưu hồ sơ</button>
        <Link href="/admin" className="btn">Huỷ</Link>
      </div>
    </form>
  );
}
