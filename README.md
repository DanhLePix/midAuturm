# Mid-Autumn Festival Website

Trang web chủ đề Tết Trung Thu với hiệu ứng đẹp mắt và âm nhạc.

## Deploy lên Vercel

### Cách 1: Deploy từ GitHub
1. Push code lên GitHub repository
2. Truy cập [Vercel](https://vercel.com)
3. Import repository từ GitHub
4. Vercel sẽ tự động nhận diện và build

### Cách 2: Deploy từ CLI
```bash
npm i -g vercel
vercel
```

### Cách 3: Deploy từ local
1. Cài đặt Vercel CLI: `npm i -g vercel`
2. Chạy lệnh: `vercel --prod`

## Cấu trúc file
- `index.html` - File HTML chính
- `style.css` - File CSS với hiệu ứng động
- `script.js` - File JavaScript xử lý tương tác
- `assets/` - Thư mục chứa nhạc nền
- `vercel.json` - Cấu hình build cho Vercel
- `vite.config.js` - Cấu hình Vite

## Lưu ý
- Đã cấu hình sẵn để deploy lên Vercel
- Hỗ trợ responsive cho mobile
- Có hiệu ứng âm thanh và hình ảnh động