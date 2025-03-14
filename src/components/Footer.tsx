const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20 bg-cover bg-center" style={{ backgroundImage: `url('/footer-bg.webp')` }}>
      <div className="container mx-auto px-6 lg:px-12 space-y-6">
        
        {/* Logo hoặc tiêu đề */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">CNCPhim</h2>
          <p className="text-gray-400 text-sm mt-2">Xem phim miễn phí với chất lượng cao</p>
        </div>

        {/* Liên kết nhanh */}
        <div className="flex flex-wrap justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-white transition">Về chúng tôi</a>
          <a href="#" className="hover:text-white transition">Điều khoản dịch vụ</a>
          <a href="#" className="hover:text-white transition">Chính sách bảo mật</a>
          <a href="#" className="hover:text-white transition">Liên hệ</a>
        </div>

        {/* Mạng xã hội */}
        <div className="flex justify-center space-x-6 mt-6">
          <a href="#" className="hover:text-white transition">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-white transition">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.37c-.83.5-1.75.86-2.73 1.05c-.78-.83-1.89-1.35-3.12-1.35c-2.36 0-4.17 2.19-3.64 4.46c-3.3-.17-6.25-1.75-8.2-4.16c-1.08 1.85-.56 4.28 1.24 5.5c-.67-.02-1.31-.21-1.87-.51c-.04 2.14 1.48 4.15 3.66 4.6c-.65.18-1.34.2-2.03.07c.57 1.78 2.23 3.08 4.19 3.12c-1.59 1.25-3.6 1.94-5.75 1.94c-.37 0-.73-.02-1.09-.07c2.08 1.37 4.55 2.16 7.2 2.16c8.64 0 13.37-7.18 13.37-13.37c0-.2 0-.4-.01-.6c.91-.66 1.7-1.5 2.32-2.45Z"/>
            </svg>
          </a>
          <a href="#" className="hover:text-white transition">
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.66 8.85 8.43 9.78c-.05-.38-.08-.96.02-1.37c.1-.45.64-2.89.64-2.89s-.16-.32-.16-.78c0-.73.42-1.27.93-1.27c.43 0 .64.33.64.72c0 .44-.28 1.1-.43 1.72c-.12.52.26.95.76.95c.92 0 1.55-1.18 1.55-2.87c0-1.5-1.07-2.55-2.59-2.55c-1.76 0-2.79 1.31-2.79 2.66c0 .53.2 1.1.45 1.41c.05.07.05.12.04.17c-.04.19-.13.61-.15.69c-.02.09-.08.12-.18.07c-.66-.31-1.08-1.27-1.08-2.06c0-1.67 1.21-3.2 3.49-3.2c1.83 0 3.26 1.31 3.26 3.07c0 1.82-1.15 3.28-2.74 3.28c-.54 0-1.04-.28-1.21-.62l-.33 1.26c-.12.48-.47 1.09-.71 1.46c.53.17 1.1.26 1.69.26c5.52 0 10-4.48 10-10S17.52 2 12 2Z"/>
            </svg>
          </a>
        </div>

        {/* Bản quyền */}
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} CNCPhim. Dự án phi lợi nhuận phục vụ học tập, không nhằm mục đích thương mại.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
