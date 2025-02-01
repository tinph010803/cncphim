import { Card, Filter } from 'src/components';
import { useQuery } from 'react-query';
import { Link, createSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://phim.nguonc.com/api';

// Hàm gọi API danh sách phim
const fetchFilms = async (type: string, page = 1) => {
  const response = await axios.get(`${API_URL}/films/${type}?page=${page}`);
  return response.data;
};

const Home = () => {
  

  // Gọi API danh sách phim lẻ mới cập nhật
  const { data: dataFilmOddNew } = useQuery(['phim-le', 1], () => fetchFilms('danh-sach/phim-le', 1), {
    staleTime: 3 * 60 * 1000,
  });

  // Gọi API danh sách phim bộ mới cập nhật
  const { data: dataFilmSeriesNew } = useQuery(['phim-bo', 1], () => fetchFilms('danh-sach/phim-bo', 1), {
    staleTime: 3 * 60 * 1000,
  });

  // Gọi API danh sách TV Shows
  const { data: dataTVShows } = useQuery(['tv-shows', 1], () => fetchFilms('danh-sach/tv-shows', 1), {
    staleTime: 3 * 60 * 1000,
  });

  // Gọi API danh sách Hoạt Hình
  const { data: dataAnime } = useQuery(['hoat-hinh', 1], () => fetchFilms('danh-sach/hoat-hinh', 1), {
    staleTime: 3 * 60 * 1000,
  });

  return (
    <>
      <Helmet>
        <title>Xem phim Online miễn phí - HTPhim</title>
        <meta
          name="description"
          content="Web xem phim online miễn phí lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia xem phim và thảo luận với hơn 10 triệu thành viên 🎉 tại VPhim ❤️💛💚"
        />
      </Helmet>
      <div className="container mt-[45px] px-4">
        <Filter />
        
        {/* Phim Lẻ Mới Cập Nhật */}
        <div className="mt-8">
          {title({ title: 'Phim lẻ mới cập nhật', titleSmall: 'Phim lẻ mới', link: 'phim-le' })}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
            {dataFilmOddNew ? (
              dataFilmOddNew.items.slice(0, 10).map((item: any) => <Card key={item.slug} data={item} />)
            ) : (
              skeleton()
            )}
          </div>
        </div>

        {/* Phim Bộ Mới Cập Nhật */}
        <div className="mt-8">
          {title({ title: 'Phim bộ mới cập nhật', titleSmall: 'Phim bộ mới', link: 'phim-bo' })}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
            {dataFilmSeriesNew ? (
              dataFilmSeriesNew.items.slice(0, 10).map((item: any) => <Card key={item.slug} data={item} />)
            ) : (
              skeleton()
            )}
          </div>
        </div>

        {/* TV Shows Mới Cập Nhật */}
        <div className="mt-8">
          {title({ title: 'TV Shows mới cập nhật', titleSmall: 'TV Shows mới', link: 'tv-shows' })}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
            {dataTVShows ? (
              dataTVShows.items.slice(0, 10).map((item: any) => <Card key={item.slug} data={item} />)
            ) : (
              skeleton()
            )}
          </div>
        </div>

        {/* Hoạt Hình Mới Cập Nhật */}
        <div className="mt-8">
          {title({ title: 'Hoạt hình mới cập nhật', titleSmall: 'Hoạt hình mới', link: 'hoat-hinh' })}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
            {dataAnime ? (
              dataAnime.items.slice(0, 10).map((item: any) => <Card key={item.slug} data={item} />)
            ) : (
              skeleton()
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

/* Component hiển thị tiêu đề và nút "Xem tất cả" */
const title = ({
  title,
  titleSmall = '',
  isHiddenArrow = false,
  link = '',
}: {
  title: string;
  titleSmall?: string;
  isHiddenArrow?: boolean;
  link?: string;
}) => {
  return (
    <div className="flex justify-between items-end pb-1 border-b border-[#1b3c5d]">
      <h2 className="uppercase text-[#b1a21e] text-2xl font-display font-medium">
        <span className="hidden sm:inline">{title}</span>
        <span className="inline sm:hidden">{titleSmall === '' ? title : titleSmall}</span>
      </h2>
      {!isHiddenArrow && (
        <Link
          to={{
            pathname: `/danh-sach/${link}`,
            search: createSearchParams({
              page: '1',
              sort_field: 'modified.time',
              category: '',
              country: '',
              year: '',
            }).toString(),
          }}
          className="text-white/80 hover:text-white text-lg p-1 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Xem tất cả</span>
          <span className="sm:hidden inline">Thêm</span>
          <svg className="ml-1 w-2 h-[17px] fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
            <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" />
          </svg>
        </Link>
      )}
    </div>
  );
};

/* Hiệu ứng skeleton loading */
const skeleton = () => (
  <>
    {Array(10)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="flex flex-col animate-pulse">
          <div className="h-[210px] sm:h-[384px] w-full mb-1 bg-slate-700" />
          <div className="h-2 w-[80%] mt-1 rounded-full bg-slate-700" />
          <div className="h-2 w-[60%] mt-2 rounded-full bg-slate-700" />
        </div>
      ))}
  </>
);
