const PATH = {
  home: '/',
  list: '/danh-sach',
  watch: '/xem-phim',
  type: ':type',
  slug: ':slug',
  search: '/tim-kiem',
  new: 'films/phim-moi-cap-nhat',  // API mới cho phim mới cập nhật
  series: 'films/danh-sach/phim-bo', // API mới cho phim bộ
  odd: 'films/danh-sach/phim-le', // API mới cho phim lẻ
  tvShows: 'films/danh-sach/tv-shows',
  anime: 'films/danh-sach/hoat-hinh',
  genres: "/danh-sach/the-loai", // ✅ Đảm bảo format chính xác
  country: "/danh-sach/quoc-gia", // ✅ Đảm bảo format chính xác
  hot: 'films/hot',
  film: '/film', // API mới cho chi tiết phim
  login: '/login',
} as const;

export default PATH;
