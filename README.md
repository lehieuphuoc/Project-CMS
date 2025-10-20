🚀 Chào mừng bạn đến với dự án CMS! (Next.js & NestJS)
I - Hướng dẫn Clone Dự Án (Lần đầu tiên)
Mở Terminal (CMD, PowerShell, hoặc Git Bash).

Chạy lệnh clone để tải toàn bộ mã nguồn về máy:

Bash

git clone https://github.com/lehieuphuoc/Project-CMS.git
Di chuyển vào thư mục dự án:

Bash

cd Project-CMS

II - Tạo Nhánh Phát Triển Riêng
Tuyệt đối không làm việc trên nhánh main. Bạn cần tạo một nhánh mới để phát triển tính năng của mình.

1. Chuyển sang nhánh chính và cập nhật:

Bash

git checkout main
git pull origin main # Luôn đảm bảo bạn có code mới nhất
2. Tạo và chuyển sang nhánh mới:
Đặt tên nhánh theo quy tắc: feature/tên-tính-năng (cho tính năng mới) hoặc fix/tên-lỗi.

Bash

# Ví dụ: Tạo nhánh để phát triển riêng
git checkout -b levana
Bây giờ bạn đang ở nhánh levana và có thể bắt đầu code.

3. Commit và Đẩy Code
Sau khi hoàn thành một phần công việc, bạn cần lưu lại lịch sử thay đổi và đẩy lên GitHub.

Thêm các file đã thay đổi:

Bash

git add .
4. Ghi lại lịch sử (Commit):

Bash

git commit -m "Tính năng / chức năng đã làm"
5. Đẩy nhánh lên GitHub (lần đầu):

Bash

git push -u origin levana