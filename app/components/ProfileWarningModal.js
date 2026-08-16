"use client";

import { useState } from "react";

export default function ProfileWarningModal() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="profile-warning-overlay" role="dialog" aria-modal="true">
      <div className="profile-warning-card">
        <div className="warning-bell" aria-hidden="true">🔔</div>
        <h2>ĐIỀU QUAN TRỌNG NHẤT</h2>
        <p className="warning-question">
          BẠN PHẢI BIẾT MÌNH ĐANG GIAO DỊCH VỚI AI?
          <br />
          LÀ REAL HAY FAKE?
        </p>

        <div className="warning-list-wrap">
          <ul className="warning-list">
            <li>Chat qua Zalo thì check số Zalo.</li>
            <li>Chat qua Facebook thì check link Facebook.</li>
            <li>Họ gửi STK thì check STK đó trước khi chuyển.</li>
          </ul>
        </div>

        <div className="warning-lock-wrap" aria-hidden="true">
          <div className="warning-lock">🔒</div>
        </div>

        <button
          type="button"
          className="warning-confirm-btn"
          onClick={() => setVisible(false)}
        >
          TÔI ĐÃ ĐỌC &amp; ĐỒNG Ý
        </button>
      </div>
    </div>
  );
}
