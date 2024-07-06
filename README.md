CÁCH CHẠY FRONTEND SAU KHI CLONE CODE VỀ:

1) Chạy giao diện web
- Mở 1 terminal/command prompt bên trong folder tổng, rồi nhập "cd client" (chuyển tới folder client) rồi nhập "npm run dev"
===> Giao diện đã chạy, bấm vào link "localhost:5173" để xem GUI 

2) Chạy server ẢO (Đây chỉ là server đơn giản để test API với JSON, chưa phải server của Hoàng Anh)
- Mở 1 terminal/command prompt KHÁC vẫn từ folder tổng --> cd server --> npm start
===> json-server ở localhost:8000 (gồm nhiều nhánh: /orders-draft, /orders-proceed, /login, /register, ...) đã chạy
  + Có thể vào file "db.json" ở folder "server" để xem, check các thay đổi và sửa đổi database ảo
    
 
- Các lỗi hiện tại:
    Vì chưa test đc với database của Hoàng Anh nên các API và logic xử lý đang có nhiều lỗi. Ví dụ: 1 response trả về cho 1 request chỉ có "data" chứ chưa có "data.EC", "data.EM", "data.DT"


* Tài liệu học:
    + Playlist tôi dùng học React:
    https://www.youtube.com/playlist?list=PLncHg6Kn2JT7QbvdNNAmQZLqWchnJEoH5

    + Tài liệu PDF của khóa học: Check mục lục cho dễ tìm phần mình cần
    https://drive.google.com/drive/folders/1WYAyusS4m498bqCR8iyzRYmS26zGh8g-

    (Khóa học này đã viết sẵn backend)
