# Hướng dẫn Cấu hình Supabase từ A-Z cho Blog

Làm theo đúng thứ tự các bước dưới đây để thiết lập toàn bộ backend (Database, Xác thực, Lưu trữ ảnh) cho trang quản lý Blog của bạn.

## 1. Khởi tạo Project Supabase
1. Truy cập [Supabase](https://supabase.com/) và đăng nhập (khuyên dùng tài khoản Github).
2. Tại màn hình Dashboard, bấm nút **"New Project"**.
3. Điền các thông tin:
   - **Name**: Đặt tên bất kỳ (vd: `my-portfolio-blog`).
   - **Database Password**: Tạo một mật khẩu mạnh và **lưu lại** (rất quan trọng).
   - **Region**: Chọn `Singapore` để tốc độ tải về Việt Nam là nhanh nhất.
4. Bấm **"Create New Project"**. Sẽ mất khoảng 1-2 phút để máy chủ khởi tạo.

---

## 2. Lấy API Keys kết nối với Nuxt
1. Nhìn cột menu bên trái, cuộn xuống dưới cùng và chọn **Project Settings** (biểu tượng bánh răng ⚙️).
2. Chọn tab **API**.
3. Bạn sẽ thấy 2 thông tin quan trọng cần copy:
   - **Project URL**
   - **Project API keys** (Copy dãy mã ở phần `anon` / `public`).
4. Mở file `.env.example` ở thư mục gốc của code, đổi tên thành `.env` và dán 2 giá trị này vào:
```env
SUPABASE_URL="https://abcxyz.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIU..."
```

---

## 3. Tạo tài khoản Admin (Đăng nhập)
Để tránh người lạ vào được trang `/admin`, bạn cần tự tay tạo một tài khoản và **khóa tính năng đăng ký tự do**.
1. Nhìn menu bên trái, chọn **Authentication** (biểu tượng hình người 👥).
2. Chọn tab **Users**.
3. Bấm nút **Add User** (góc phải trên) -> Chọn **Create New User**.
4. Điền Email và Mật khẩu của bạn. Bấm xác nhận.
5. **(CỰC KỲ QUAN TRỌNG)**: Nhấn vào tab **Providers** ở menu bên trái > Chọn **Email** > Mở rộng mục Email:
   - Tắt (Disable) dòng **"Enable email signup"** (để chặn hacker tự tạo tài khoản).
   - Tắt (Disable) dòng **"Confirm email"** (để tài khoản bạn vừa tạo ở trên kích hoạt luôn mà không cần xác nhận).
   - Bấm **Save**.

---

## 4. Tạo Database Table (Bảng lưu Blog)
Chúng ta sẽ tạo bảng `blogs` bằng câu lệnh SQL cho nhanh và chuẩn xác.
1. Nhìn menu bên trái, chọn **SQL Editor** (biểu tượng dấu `</>`).
2. Bấm **"New Query"**.
3. Copy và dán toàn bộ đoạn code dưới đây vào khung soạn thảo:
```sql
CREATE TABLE public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  content text not null,
  image_url text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```
4. Bấm nút **RUN** (hoặc `Cmd/Ctrl + Enter`). Bảng của bạn đã được tạo thành công!

---

## 5. Phân quyền Bảo mật (Row Level Security - RLS)
Supabase cực kỳ bảo mật, mặc định mọi Database đều bị khoá. Nếu bạn không phân quyền, Nuxt sẽ không thể lấy được bài viết ra. Chúng ta sẽ đặt luật: *"Người xem web đọc được bài viết, nhưng chỉ Admin mới được viết bài"*.

Vẫn ở khung **SQL Editor** đó, xóa đoạn code cũ, dán đoạn code này vào và bấm **RUN**:
```sql
-- Bật chế độ bảo mật (RLS) cho bảng blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 1. Cho phép MỌI NGƯỜI ĐỌC bài viết (chỉ bài đã xuất bản), Admin đọc được tất cả
CREATE POLICY "Public can view blogs"
ON public.blogs FOR SELECT USING (
  is_published = true 
  OR auth.role() = 'authenticated'
);

-- 2. Chỉ có Admin (người đã login) mới được THÊM bài viết
CREATE POLICY "Admin can insert blogs"
ON public.blogs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Chỉ có Admin mới được CẬP NHẬT (Sửa) bài viết
CREATE POLICY "Admin can update blogs"
ON public.blogs FOR UPDATE USING (auth.role() = 'authenticated');

-- 4. Chỉ có Admin mới được XÓA bài viết
CREATE POLICY "Admin can delete blogs"
ON public.blogs FOR DELETE USING (auth.role() = 'authenticated');
```

---

## 6. Storage (Lưu trữ hình ảnh bài viết)
Khi bạn viết blog sẽ có ảnh bìa hoặc ảnh chèn trong bài. Ta cần tạo nơi chứa ảnh.
1. Chọn **Storage** (biểu tượng hộp tài liệu 📦) ở menu bên trái.
2. Bấm **"New bucket"**.
3. Đặt tên: `blog-images`.
4. **Cực kỳ quan trọng**: Gạt nút bật dòng **"Public bucket"** (để ảnh có thể hiện trên web). Bấm Save.
5. Để cho phép Admin up ảnh lên bucket này, bấm vào chữ **"Policies"** (cạnh tên bucket). Ở dòng `blog-images`, bấm **New Policy** > **For Full Customization**:
   - Tên: `Admin can upload images`
   - Allowed operation: Chọn **ALL** (hoặc INSERT, SELECT, UPDATE, DELETE)
   - Target roles: Chọn `authenticated`
   - Bấm **Save Policy**.

🎉 **Hoàn tất!** Bây giờ Backend của bạn đã sẵn sàng 100%. Bạn có thể chạy `npm run dev`, vào `http://localhost:3000/admin/login` và đăng nhập bằng tài khoản Admin ở bước 3.
