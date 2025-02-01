import { Card } from 'src/components';
import { useQuery } from 'react-query';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import PATH from 'src/utils/path';
import Pagination from 'src/components/Pagination';
import { useQueryConfig, useScrollTop } from 'src/hooks';

const API_URL = import.meta.env.VITE_API_URL || 'https://phim.nguonc.com/api';

// Hàm gọi API tìm kiếm phim
const fetchSearchFilms = async (keyword: string, page: number) => {
  if (!keyword) return null; // Nếu không có từ khóa, không gọi API
  const response = await axios.get(`${API_URL}/films/search?keyword=${keyword}&page=${page}`);
  return response.data;
};

const Search = () => {
  const navigate = useNavigate();
  const queryConfig = useQueryConfig();

  // Gọi API tìm kiếm phim
  const { data, isLoading, isError } = useQuery(
    ['searchFilms', queryConfig.keyword, queryConfig.page],
    () => fetchSearchFilms(queryConfig.keyword, Number(queryConfig.page)),
    {
      staleTime: 3 * 60 * 1000,
      enabled: !!queryConfig.keyword, // Chỉ gọi API nếu có từ khóa tìm kiếm
    }
  );

  useScrollTop([queryConfig]);

  return (
    <>
      <Helmet>
        <title>{`CNCPhim | Tìm kiếm: ${queryConfig.keyword || 'Không có từ khóa'}`}</title>
        <meta name="description" content={`Kết quả tìm kiếm phim cho từ khóa: ${queryConfig.keyword}. Xem phim miễn phí tại CNCPhim`} />
      </Helmet>

      <div className="container px-4 mt-14">
        {/* Ô nhập tìm kiếm */}
        <input
          onChange={(e) =>
            navigate({
              pathname: PATH.search,
              search: createSearchParams({
                keyword: e.target.value.trim(),
                page: '1',
              }).toString(),
            })
          }
          type="text"
          defaultValue={queryConfig.keyword || ''}
          autoFocus
          placeholder="Nhập tên phim..."
          className="w-full p-3 rounded-md text-xl outline-none"
        />

        {/* Hiển thị danh sách phim tìm thấy */}
        {isLoading ? (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse">
                  <div className="h-[210px] sm:h-[384px] w-full mb-1 bg-slate-700" />
                  <div className="h-2 w-[80%] mt-1 rounded-full bg-slate-700" />
                  <div className="h-2 w-[60%] mt-2 rounded-full bg-slate-700" />
                </div>
              ))}
          </div>
        ) : queryConfig.keyword && (isError || !data || data.items.length === 0) ? (
          // Chỉ hiển thị "Không tìm thấy phim" nếu đã nhập từ khóa
          <p className="w-full h-[50vh] text-center text-xl text-white flex justify-center items-center">
            Không tìm thấy phim với từ khóa "{queryConfig.keyword}".
          </p>
        ) : (
          <>
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
                {data?.items.map((item: any) => (
                  <Card key={item.id} data={item} />
                ))}
              </div>
            </div>


            {/* Phân trang */}
            {data?.params?.pagination?.totalItems > 0 && (
              <div className="mt-4">
                <Pagination
                  queryConfig={{ keyword: queryConfig.keyword }}
                  page={data.params.pagination.currentPage}
                  totalPage={Math.ceil(
                    (data.params.pagination.totalItems || 0) / (data.params.pagination.totalItemsPerPage || 1)
                  )}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Search;
