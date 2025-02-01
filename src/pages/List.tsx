import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, Filter } from 'src/components';
import Pagination from 'src/components/Pagination';

const API_URL = import.meta.env.VITE_API_URL || 'https://phim.nguonc.com/api';

// Xác định API phù hợp dựa trên type
const getFilmApiUrl = (type: string, page: number) => {
  if (type === 'phim-moi-cap-nhat') {
    return `${API_URL}/films/phim-moi-cap-nhat?page=${page}`;
  } else {
    return `${API_URL}/films/danh-sach/${type}?page=${page}`;
  }
};

// Hàm gọi API
const fetchFilms = async (type: string, page: number) => {
  const url = getFilmApiUrl(type, page);
  const response = await axios.get(url);
  return response.data;
};

const List = () => {
  const { type } = useParams(); // Lấy loại phim từ URL
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // Gọi API danh sách phim dựa theo type và page
  const { data, isLoading, isError } = useQuery(
    ['films', type, page],
    () => fetchFilms(type || 'phim-moi-cap-nhat', page),
    { staleTime: 3 * 60 * 1000 }
  );

  const films = data?.items || [];
  const totalPages = data?.paginate?.total_page || 1;

  return (
    <div className="container px-4 mt-[45px]">
      <Filter /> {/* Bộ lọc thể loại, quốc gia */}

      {/* Nội dung danh sách phim */}
      {isLoading ? (
        <p className="text-white text-center">Đang tải phim...</p>
      ) : isError ? (
        <p className="text-red-500 text-center">Lỗi khi tải phim</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-white mb-4">
            {type === 'phim-moi-cap-nhat' ? 'Phim Mới Cập Nhật' : 'Danh Sách Phim'}
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
