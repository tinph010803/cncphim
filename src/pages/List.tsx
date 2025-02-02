import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Card, Filter } from "src/components";
import Pagination from "src/components/Pagination";

const API_URL = import.meta.env.VITE_API_URL || "https://phim.nguonc.com/api";

// Xác định API đúng dựa trên Loại phim, Thể loại, Quốc gia, Năm phát hành
const getFilmApiUrl = (type: string | undefined, params: URLSearchParams, page: number) => {
  const category = params.get("category");
  const country = params.get("country");
  const year = params.get("year");

  let url = `${API_URL}/films/phim-moi-cap-nhat?page=${page}`; // ⚡ Mặc định là Phim Mới

  // Nếu type là phim-bo, phim-le, hoat-hinh, tv-shows
  if (type && ["phim-bo", "phim-le", "hoat-hinh", "tv-shows"].includes(type)) {
    url = `${API_URL}/films/danh-sach/${type}?page=${page}`;
  }

  // Nếu có category (thể loại)
  if (category) {
    url = `${API_URL}/films/the-loai/${category}?page=${page}`;
  }

  // Nếu có country (quốc gia)
  if (country) {
    url = `${API_URL}/films/quoc-gia/${country}?page=${page}`;
  }

  //  Nếu có year (năm phát hành)
  if (year) {
    url = `${API_URL}/films/nam-phat-hanh/${year}?page=${page}`;
  }

  return url;
};

// ✅ Hàm gọi API danh sách phim
const fetchFilms = async (type: string | undefined, params: URLSearchParams, page: number) => {
  const url = getFilmApiUrl(type, params, page);
  const response = await axios.get(url);
  return response.data;
};

const List = () => {
  const { type, slug } = useParams(); // Lấy type và slug từ URL
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  // Gọi API danh sách phim dựa theo type, searchParams, page
  const { data, isLoading, isError } = useQuery(
    ["films", type, searchParams.toString(), page],
    () => fetchFilms(type, searchParams, page),
    { staleTime: 3 * 60 * 1000 }
  );

  const films = data?.items || [];
  const totalPages = data?.paginate?.total_page || 1;

  return (
    <div className="container px-4 mt-[45px]">
      <Filter /> {/* Bộ lọc Thể loại, Quốc gia, Năm phát hành, Loại phim */}

      {/* Nội dung danh sách phim */}
      {isLoading ? (
        <p className="text-white text-center">Đang tải phim...</p>
      ) : isError ? (
        <p className="text-red-500 text-center">Lỗi khi tải phim</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-white mb-4">
            {type === "quoc-gia"
              ? `Phim theo Quốc gia: ${slug ? decodeURIComponent(slug) : ""}`
              : type === "the-loai"
              ? `Phim thể loại: ${slug ? decodeURIComponent(slug) : ""}`
              : type === "nam-phat-hanh"
              ? `Phim Năm ${slug}`
              : type === "phim-le"
              ? "Phim Lẻ"
              : type === "phim-bo"
              ? "Phim Bộ"
              : type === "hoat-hinh"
              ? "Phim Hoạt Hình"
              : type === "tv-shows"
              ? "TV Shows"
              : "Phim Mới Cập Nhật"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {films.map((film: any) => (
              <Card key={film.slug} data={film} />
            ))}
          </div>

          {/* Hiển thị phân trang */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination page={page} totalPage={totalPages} queryConfig={{}} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
