import TopBar from "../components/TopBar";

export default function RulesPage() {
  return (
    <>
      <TopBar />
      <main className="rules-page">
        <div className="rules-shell">
          <div className="rules-badge" aria-hidden="true">
            <div className="rules-lock">🔒</div>
          </div>

          <h1>NỘI QUY GIAO DỊCH</h1>

          <h2>
            <a href="https://t.me/ngducvinh" target="_blank" rel="noreferrer">
              LIÊN HỆ QUẢN LÝ
            </a>
          </h2>

          <ol>
            <li>Nghiêm cấm giao dịch vi phạm pháp luật.</li>
            <li>TrustList chỉ xử lý khi giao dịch trên Facebook, Zalo.</li>
            <li>
              <strong>Nếu GDTG qua Zalo</strong>, để tránh việc giao dịch với Fake,
              bị giải tán box rồi tìm Real ăn vạ. TrustList yêu cầu người dùng phải
              quay Video màn hình Check tin nhắn và thông tin Zalo AD cần key trong
              box xem Real hay Fake trước khi chuyển tiền, thông tin. TrustList sẽ
              chỉ hỗ trợ xử lý khi có Video.
            </li>
            <li>Không được tự ý chuyển tiền, tự ý giao dịch khi admin chưa xác nhận box, xác nhận nhận tiền.</li>
            <li>Chỉ giao dịch với stk và thông tin có trong link hồ sơ, chuyển khoản đúng nội dung admin yêu cầu.</li>
            <li>Nếu bạn bị kích khỏi nhóm trong khi giao dịch, hãy liên hệ ngay với admin qua Zalo hoặc Facebook có gắn trên link hồ sơ xác minh.</li>
            <li>Không xử lý các vấn đề của web Gạch thẻ, Like sub (2 web dạng này có nhiều thứ cần check, time đợi và xử lý bên trong nên TrustList sẽ không xử lý).</li>
            <li>Nghiêm cấm thêm người thứ 4, out box, kích, đổi tên box, sửa chát, tạo nhiều box. Đây được xác định là hành vi gây khó khăn, gian lận trong giao dịch.</li>
            <li>Giao dịch sòng phẳng, không Spam Box, không phốt khi chưa giải quyết rõ ràng. Quá 48h mà các Ad không rep box hay không xử lý, hãy <a href="https://t.me/ngducvinh" target="_blank" rel="noreferrer">Liên hệ quản lý</a> để được hỗ trợ.</li>
            <li>TrustList không xử lý giao dịch bắc cầu, Gdv cọc admin, vay nợ lãi…… Website chỉ hỗ trợ xác minh uy tín khi bạn trực tiếp giao dịch với những thông tin, dịch vụ mua bán có đăng ký trong link hồ sơ xác minh của TrustList. Giao dịch với Admin CS đồng nghĩa với việc bạn đồng ý “khi có vấn đề tranh chấp xảy ra giữa Người bán & Người mua thì CS sẽ là người phân xử và có 100% quyền quyết định đúng sai và đưa ra phương án giải quyết cuối cùng”. Phải chắc chắn rằng bạn đang giao dịch với đúng Facebook và thông tin của Admin gắn trên link hồ sơ xác minh <a href="https://trustlist.vn/" target="_blank" rel="noreferrer">https://trustlist.vn/</a>. TrustList sẽ không hỗ trợ xử lý nếu bạn giao dịch với Fake.</li>
            <li>Trường hợp phát sinh giao dịch có dấu hiệu vi phạm từ Admin, khuyến nghị giao dịch đã ghi nhận trên hồ sơ uy tín của Admin đó sẽ được hệ thống xem xét xử lý theo quy định như sau:</li>
          </ol>

          <ul className="rules-sublist">
            <li>Đối với 01 trường hợp phát sinh giao dịch có dấu hiệu scam, người bị thiệt hại có thể được tiếp nhận và xem xét hỗ trợ xử lý hồ sơ theo chính sách của hệ thống. Mức hỗ trợ tối đa lên đến 200% giá trị thiệt hại thực tế của giao dịch, với điều kiện không vượt quá hạn mức khuyến nghị được công bố trên hồ sơ xác minh uy tín của Admin đó.</li>
            <li>Trường hợp có nhiều người cùng bị thiệt hại liên quan đến một Admin, hệ thống sẽ tổng hợp toàn bộ hồ sơ hợp lệ và phân bổ mức hỗ trợ theo tỷ lệ tương ứng với giá trị thiệt hại của từng người, căn cứ trên hạn mức đã ghi nhận trên hồ sơ uy tín của Admin đó.</li>
            <li>Ví dụ khuyến nghị giao dịch ghi nhận trên hồ sơ của Admin là <strong>10.000.000đ</strong>. Ad đó Scam 3 người:</li>
          </ul>

          <ul className="rules-sublist">
            <li>A bị scam 1tr</li>
            <li>B bị Scam 3tr</li>
            <li>C bị scam 2tr</li>
          </ul>

          <ol>
            <li>Tổng số tiền Ad đó Scam là 6tr thì số tiền A, B, C sẽ nhận được là:</li>
          </ol>

          <ul className="rules-sublist">
            <li>A = (10:6) x 1 = 1tr7</li>
            <li>B = (10:6) x 3 = 5tr</li>
            <li>C = (10:6) x 2 = 3tr3</li>
          </ul>

          <ol start="2">
            <li>Trường hợp tổng giá trị thiệt hại vượt quá số tiền khuyến nghị trên hồ sơ xác minh uy tín của Admin, hệ thống sẽ tổng hợp các thiệt hại hợp lệ và xem xét phân bổ mức hỗ trợ theo tỷ lệ tương ứng, căn cứ trên hạn mức khuyến nghị đã công bố.</li>
            <li>
              <strong>Thứ tự ưu tiên xử lý hồ sơ uy tín khi admin scam:</strong>
              <ul className="rules-sublist">
                <li>Nhóm 1: các giao dịch mua bán bị scam bởi các dịch vụ có đăng ký trên link hồ sơ uy tín.</li>
                <li>Nhóm 2: tiền bị hold, scam trên các web admin đó quản lý.</li>
                <li>Nhóm 3: các giao dịch viên cọc tiền admin đó.</li>
                <li>Nhóm 4: khác…</li>
              </ul>
            </li>
          </ol>

          <p>
            <strong>Xử lý từ trên xuống dưới:</strong> Sau khi hoàn tất việc xem xét hỗ trợ đối với Nhóm 1, nếu hạn mức hỗ trợ vẫn còn, phần còn lại sẽ được chuyển sang Nhóm 2. Trường hợp tiếp tục còn dư, hệ thống sẽ phân bổ lần lượt cho Nhóm 3, Nhóm 4 và các nhóm tiếp theo theo thứ tự ưu tiên đã quy định.
          </p>

          <h3>Nếu bạn đã bị lừa đảo</h3>

          <ul className="rules-sublist">
            <li><strong>Bước 1: Liên hệ ngân hàng:</strong> Gọi điện lên tổng đài của ngân hàng, báo bị lừa bởi stk… bằng nào tiền.. stk đó là stk ảo, lừa đảo như nào….</li>
            <li><strong>Bước 2: Gửi đơn tố cáo lên VNID:</strong> Chụp lại toàn bộ đoạn chát và bill chuyển khoản, sau đó lên chát GPT nêu rõ tình trạng và bảo nó viết cho 1 đơn tố cáo.</li>
            <li>Vào VNeID ấn vào ô tìm kiếm =&gt; Kiến nghị, phản ánh về ANTT =&gt; Tạo mới yêu cầu =&gt; điền đầy đủ thông tin, bằng chứng và gửi tố cáo.</li>
          </ul>
        </div>
      </main>
    </>
  );
}
