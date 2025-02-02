import DOMPurify from 'dompurify';
import { useQuery } from 'react-query';
import { Link,  useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FacebookShareButton from 'react-share/es/FacebookShareButton';
import { Fragment } from 'react';
import axios from 'axios';
import PATH from 'src/utils/path';

const API_URL = import.meta.env.VITE_API_URL || 'https://phim.nguonc.com/api';

// Hàm gọi API lấy thông tin phim
const fetchFilmDetails = async (slug: string) => {
  const response = await axios.get(`${API_URL}/film/${slug}`);
  return response.data;
};

const Detail = () => {
  const { slug } = useParams();

  // Gọi API chi tiết phim
  const { data, isLoading, isError } = useQuery(['filmDetail', slug], () => fetchFilmDetails(slug as string), {
    staleTime: 3 * 60 * 1000,
    enabled: !!slug, // Chỉ gọi API nếu slug tồn tại
  });

  const dataFilm = data?.movie;

  if (isLoading) return <div className="text-white text-center mt-10">Đang tải thông tin phim...</div>;
  if (isError || !dataFilm) return <div className="text-red-500 text-center mt-10">Không tìm thấy phim!</div>;

  return (
    <>
      <Helmet>
        <title>{`CNCPhim | ${dataFilm.name}`}</title>
        <meta name="description" content={`${dataFilm.description} | Xem phim miễn phí tại CNCPhim`} />
      </Helmet>

      {/* Ảnh nền của phim */}
      <div
        className="h-[600px] -mt-[56px] bg-cover bg-no-repeat bg-[50%_0] relative before:content-[''] before:absolute before:w-full before:top-0 before:bottom-0 before:bg-[#020d18bf]"
        style={{
          backgroundImage: `url('${dataFilm.poster_url}')`,
        }}
      />

      <div className="container px-4 -mt-[360px] pt-3 relative z-10">
        <div className="flex-col md:flex-row flex gap-11 md:gap-[64px]">
          {/* Ảnh phim */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              title={dataFilm.name}
              src={dataFilm.thumb_url}
              alt={dataFilm.name}
              className="w-[282px] h-[432px] object-cover"
              loading="eager"
            />
            <Link
              to={`${PATH.watch}/${dataFilm.slug}`}
              title={`Xem phim ${dataFilm.name}`}
              className="active:scale-90 flex items-center justify-center gap-3 text-white uppercase text-xl bg-red-700/80 hover:bg-red-700 w-full rounded p-[7px] mt-4"
            >
              <svg className="fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
              </svg>
              Xem phim
            </Link>
          </div>

          {/* Thông tin phim */}
          <div className="flex-1 pt-3">
            <h1 className="text-white text-5xl font-heading1 leading-[45px] mb-3">{dataFilm.original_name}</h1>
            <h2 className="text-[#b5b5b5] text-2xl break-all leading-[30px] mb-8">
              {dataFilm.name} (<strong className="text-[#428bca]">{dataFilm.total_episodes} Tập</strong>)
            </h2>

            <span className="inline-block cursor-help mb-8 md:mb-10 text-white text-lg">
              {dataFilm.time ? dataFilm.time : 'Đang cập nhật'}
            </span>

            <div className="flex gap-3 mb-8 md:mb-10">
              <span className="text-white cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-rose-600/80">
                {dataFilm.quality}
              </span>
              <span className="text-white cursor-help w-max block p-[2px] px-[10px] rounded-[4px] bg-yellow-400/80">
                {dataFilm.language}
              </span>
            </div>

            {/* Chia sẻ Facebook */}
            <div className="block lg:flex items-start justify-between gap-6">
              <FacebookShareButton url={`https://cncphim.site/${PATH.film}/${slug}`} className="flex-shrink-0 mb-6 md:mb-14">
                <div className="text-white bg-[#485fc7] rounded px-4 py-2 flex items-center justify-center gap-3">
                  <svg className="fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                  </svg>
                  Chia sẻ
                </div>
              </FacebookShareButton>
            </div>


            <div className="mb-6">
              {/* Đạo diễn */}
              <p className="mb-1 text-[#7a7a7a] flex">
                <span className="w-[120px] flex-shrink-0 inline-block uppercase">Đạo diễn</span>
                <span className="text-white font-medium">
                  {dataFilm.director ? dataFilm.director : 'Đang cập nhật'}
                </span>
              </p>

              {/* Diễn viên */}
              <p className="mb-1 text-[#7a7a7a] flex">
                <span className="w-[120px] flex-shrink-0 inline-block uppercase">Diễn viên</span>
                <span className="text-white font-medium break-all">
                  {dataFilm.casts ? dataFilm.casts : 'Đang cập nhật'}
                </span>
              </p>

              {/* Quốc gia */}
              <p className="mb-1 text-white uppercase">
                <span className="w-[120px] inline-block text-[#7a7a7a]">Quốc gia</span>
                {dataFilm.category[4]?.list?.map((item: any, index: number) =>
                  index > 0 ? (
                    <Fragment key={item.id}>
                      {', '}
                      <Link
                        title={`Tìm kiếm ${item.name}`}
                        to={`${PATH.list}/${PATH.country}/${item.id}`}
                        className="font-medium capitalize hover:underline"
                      >
                        {item.name}
                      </Link>
                    </Fragment>
                  ) : (
                    <Link
                      title={`Tìm kiếm ${item.name}`}
                      key={item.id}
                      to={`${PATH.list}/${PATH.country}/${item.id}`}
                      className="font-medium capitalize hover:underline"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </p>

              {/* Năm phát hành */}
              <p className="mb-1 text-[#7a7a7a] uppercase">
                <span className="w-[120px] inline-block">Khởi chiếu</span>
                <Link
                  title={`Tìm kiếm ${dataFilm.category[3]?.list[0]?.name}`}
                  to={`${PATH.list}/${PATH.new}?year=${dataFilm.category[3]?.list[0]?.name}`}
                  className="text-white font-medium capitalize hover:underline"
                >
                  {dataFilm.category[3]?.list[0]?.name || 'Đang cập nhật'}
                </Link>
              </p>
            </div>

            {/* Mô tả phim */}
            <p className="text-[#b5b5b5]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dataFilm.description) }} />

        
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
