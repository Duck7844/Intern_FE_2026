# intern_FE – Pacificwide website + Admin dashboard (Next.js)

Frontend cho Pacificwide. Nội dung trang chủ, blog và form liên hệ đều lấy từ API NestJS ở `../intern_be`; khu vực `/admin` cho phép quản trị nội dung.

## Stack

- Next.js 16.4 (App Router, Cache Components + Partial Prefetching, Turbopack), React 19, TypeScript
- Tailwind CSS 4 (design tokens trong `app/globals.css`)
- `react-markdown` + `remark-gfm` để render Markdown an toàn (không dùng `dangerouslySetInnerHTML`)

## 1. Cài đặt & biến môi trường

```powershell
cd D:\Intern\intern_FE
npm install
copy .env.example .env.local
```

| Biến | Ý nghĩa |
| --- | --- |
| `API_URL` | URL API dùng phía server (Server Components, route handlers). Mặc định `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | URL API dùng phía trình duyệt (gửi form liên hệ, hiển thị ảnh `/uploads/...`) |

`next.config.ts` **rewrite** `/uploads/:path*` sang `<API_URL>/uploads/:path*`, nên ảnh upload (`/uploads/<uuid>.ext`) là cùng origin với website và `next/image` tối ưu được (Next 16 từ chối tải ảnh remote từ host localhost / IP nội bộ). Host của API cũng được thêm vào `images.remotePatterns` cho trường hợp DB lưu URL tuyệt đối.

## 2. Chạy

Backend phải chạy trước (xem `../intern_be/README.md`). Frontend dùng cổng **3001**:

```powershell
npm run dev       # http://localhost:3001
# production
npm run build
npm run start
```

## 3. Trang public

| Route | Nguồn dữ liệu |
| --- | --- |
| `/` | `GET /home-sections` – mỗi block (hero, picked for you, …) lấy title/content/imageUrl theo `key` |
| `/blog` | `GET /posts?page&limit&q` – tìm kiếm, phân trang, trạng thái loading/empty/error |
| `/blog/[slug]` | `GET /posts/:slug` – Markdown, bài liên quan, `notFound()` khi chưa publish |
| `/contact` (và block form trên `/services`) | `POST /contacts` – validate phía client + server, loading/success/error, reset sau khi gửi |
| `/login`, `/register` | Đăng nhập / đăng ký người dùng website (`POST /auth/login`, `POST /auth/register`) – nút **Sign in / Sign up** trên header; sau khi đăng nhập header hiển thị "Hi, <tên>" + Sign out |

Dữ liệu được fetch **mỗi request** bên trong `<Suspense>` (không cache), nên thay đổi trong admin hiện ngay ở lần tải kế tiếp; phần vỏ trang (header, footer) được prerender tĩnh.

### Phiên đăng nhập người dùng website

- `POST /api/auth/login`, `POST /api/auth/register` (đăng ký xong tự đăng nhập), `POST /api/auth/logout` – route handler gọi API và giữ JWT trong cookie **HttpOnly** `pw_token` (tách biệt với cookie admin).
- Header (`components/layout/account-links.tsx`) đọc cookie trong `<Suspense>`, xác minh qua `GET /auth/me` và hiển thị Sign in / Sign up hoặc tên + Sign out.
- Cookie chỉ có cờ `Secure` khi `NODE_ENV=production`; trên server production hãy chạy sau HTTPS và đặt biến này.

## 4. Admin (`/admin`)

| Route | Chức năng |
| --- | --- |
| `/admin/login` | Đăng nhập (chỉ tài khoản role `admin`); giao diện admin bằng tiếng Anh |
| `/admin` | Dashboard: số bài viết, liên hệ chưa đọc, số section |
| `/admin/home` | Sửa tiêu đề / mô tả / ảnh từng section trang chủ |
| `/admin/posts`, `/admin/posts/create`, `/admin/posts/[id]/edit` | CRUD bài viết, tìm kiếm, lọc draft/published, publish/gỡ, xem trước Markdown, upload thumbnail |
| `/admin/contacts`, `/admin/contacts/[id]` | Danh sách, lọc đã đọc/chưa đọc, xem chi tiết (tự đánh dấu đã đọc), xóa |

Tài khoản admin được tạo bằng `npm run seed` ở backend (`ADMIN_EMAIL` / `ADMIN_PASSWORD` trong `intern_be/.env`).

### Cơ chế xác thực

- `POST /api/admin/login` (route handler) gọi `POST /auth/login` của API, từ chối tài khoản không phải admin (403) và lưu JWT trong cookie **HttpOnly, SameSite=Lax, Secure khi production**, tên `pw_admin_token`. JavaScript trình duyệt không đọc được token; không dùng localStorage hay URL.
- Mọi call admin từ trình duyệt đi qua proxy `/api/admin/<path>` (`app/api/admin/[...path]/route.ts`): đọc cookie, gắn `Authorization: Bearer`, chỉ cho phép prefix `home-sections|posts|contacts|upload|stats`, và yêu cầu header `X-Requested-With: fetch` cho mọi request không phải GET (chống CSRF). API vẫn tự kiểm tra token + role ở mỗi request.
- `proxy.ts` (Next 16 thay cho middleware) chuyển hướng `/admin/*` về `/admin/login?next=…` khi không có cookie; layout `/admin/(dashboard)` xác minh lại qua `GET /auth/me` và redirect nếu token hết hạn hoặc không phải admin. Phản hồi 401 từ proxy cũng đưa người dùng về trang đăng nhập.
- `POST /api/admin/logout` xóa cookie.

## 5. Upload ảnh trong admin

Component `components/admin/image-upload.tsx` kiểm tra loại (JPG/PNG/WEBP) và dung lượng (≤ 2 MB) trước khi gửi `multipart/form-data` tới `/api/admin/upload`; API lưu file và trả `/uploads/<uuid>.ext`, URL đó được ghi vào section/bài viết.

## 6. Kiểm thử & build

```powershell
npx next typegen       # sinh PageProps/LayoutProps
npx tsc --noEmit       # type-check
npm run lint           # eslint (eslint-config-next)
npm run build          # next build – phải không có lỗi
```

## 7. Cấu trúc chính

```
app/page.tsx, app/blog/, app/contact/, app/services/     trang public
app/admin/login, app/admin/(dashboard)/…                  admin
app/api/admin/{login,logout,[...path]}/route.ts           cookie auth + proxy (admin)
app/login, app/register, app/api/auth/*                   đăng nhập / đăng ký người dùng website
components/auth/*, components/layout/account-links.tsx    form auth + nút Sign in/Sign up/Sign out
proxy.ts                                                  bảo vệ /admin/*
lib/api/{config,http,public,contacts,admin,admin-session}.ts   API layer (không dùng any)
types/api.ts                                              kiểu dữ liệu API
components/home/*, components/blog/*, components/admin/*  UI
```
