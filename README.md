# Hướng dẫn cài đặt dự án

Đây là hướng dẫn dành cho các thành viên mới của dự án. Vui lòng làm theo các bước sau để cài đặt và chạy dự án trên máy của bạn.

## Các bước cài đặt

1.  **Clone repository:**
    Mở terminal hoặc Git Bash và chạy lệnh sau. Thay thế `<URL_CUA_REPOSITORY>` bằng URL SSH hoặc HTTPS của repository.
    ```bash
    git clone <URL_CUA_REPOSITORY>
    ```
    Thao tác này sẽ tạo một thư mục có tên là `fe-cms` (hoặc tên repository) trên máy của bạn.

2.  **Đi vào thư mục dự án:**
    ```bash
    cd fe-cms
    ```

3.  **Cài đặt các dependencies:**
    Dự án này sử dụng `npm`. Chạy lệnh sau ở thư mục gốc của `fe-cms`:
    ```bash
    npm install
    ```

4.  **Chạy development server:**
    Sau khi cài đặt xong, chạy lệnh sau để khởi động server:
    ```bash
    npm run dev
    ```

5.  **Mở ứng dụng:**
    Mở trình duyệt và truy cập vào [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Quy trình làm việc với Git

Để đảm bảo sự nhất quán và tránh xung đột code, tất cả các thành viên phải tuân theo quy trình làm việc sau.

**TUYỆT ĐỐI KHÔNG PUSH CODE TRỰC TIẾP LÊN NHÁNH `main` (hoặc `master`).**

1.  **Cập nhật nhánh `master`:**
    Trước khi bắt đầu một công việc mới, hãy đảm bảo code ở nhánh `master` của bạn là mới nhất.
    ```bash
    git checkout master
    git pull origin master
    ```

2.  **Tạo nhánh mới:**
    Tạo một nhánh mới từ nhánh `master` để làm việc. Tên nhánh nên tuân theo quy ước sau:
    *   `feature/ten-tinh-nang`: Cho tính năng mới (ví dụ: `feature/login-page`).
    *   `fix/ten-loi`: Cho việc sửa lỗi (ví dụ: `fix/button-alignment`).

    ```bash
    git checkout -b <ten-nhanh-moi>
    # Ví dụ: git checkout -b feature/user-profile
    ```

3.  **Làm việc và commit code:**
    Thực hiện các thay đổi của bạn trên nhánh mới. Sau khi hoàn thành một phần công việc, hãy commit code.
    ```bash
    # Thêm tất cả các file đã thay đổi
    git add .

    # Commit với một thông điệp rõ ràng
    git commit -m "feat: Thêm chức năng X" 
    # hoặc "fix: Sửa lỗi Y"
    ```

4.  **Push code lên nhánh của bạn:**
    Push code từ nhánh của bạn lên remote repository.
    ```bash
    git push origin <ten-nhanh-moi>
    # Ví dụ: git push origin feature/user-profile
    ```

5.  **Tạo Pull Request:**
    Sau khi push code, hãy truy cập vào repository trên GitHub (hoặc nền tảng khác) và tạo một "Pull Request" (hoặc "Merge Request") để yêu cầu merge code từ nhánh của bạn vào nhánh `master`.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
