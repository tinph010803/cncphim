import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, createSearchParams, useParams } from 'react-router-dom';
import FacebookShareButton from 'react-share/es/FacebookShareButton';
import axios from 'axios';
import PATH from 'src/utils/path';

const API_URL = import.meta.env.VITE_API_URL || 'https://phim.nguonc.com/api';

// Hàm gọi API chi tiết phim
const fetchFilmDetails = async (slug: string) => {
  const response = await axios.get(`${API_URL}/film/${slug}`);
  return response.data;
};

const Film = () => {
  const [nameServer, setNameServer] = useState<string>('');
  const [episode, setEpisode] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { slug } = useParams();

  // Gọi API chi tiết phim
  const { data, isLoading, isError } = useQuery(['filmDetail', slug], () => fetchFilmDetails(slug as string), {
    staleTime: 3 * 60 * 1000,
    enabled: !!slug, // Chỉ gọi API nếu slug tồn tại
  });

  const dataFilm = data?.movie;

  useEffect(() => {
    if (dataFilm && dataFilm.episodes.length > 0) {
      setNameServer(dataFilm.episodes[0].server_name);
      setEpisode(dataFilm.episodes[0].items[0]?.embed || '');
    }
  }, [dataFilm]);

  useEffect(() => {
    if (dataFilm && nameServer) {
      const server = dataFilm.episodes.find((item: { server_name: string; items: { embed: string }[] }) => item.server_name === nameServer);
      setEpisode(server?.items[0]?.embed || '');
    }
  }, [dataFilm, nameServer]);

  if (isLoading) return <div className="text-white text-center mt-10">Đang tải thông tin phim...</div>;
  if (isError || !dataFilm) return <div className="text-red-500 text-center mt-10">Không tìm thấy phim!</div>;

  return (
    <>
      <Helmet>
        <title>{`CNCPhim | ${dataFilm.name}`}</title>
        <meta name="description" content={`${dataFilm.description} | Xem phim miễn phí tại CNCPhim`} />
      </Helmet>

      <div>
        {/* Video player */}
        <div className="relative w-full h-[36vh] sm:h-[56vh] md:h-[66vh] lg:h-[76vh] xl:h-[86vh] bg-black">
          {episode ? (
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              title={dataFilm.name}
              src={episode}
              key={episode}
              frameBorder={0}
              loading="eager"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-white text-center flex items-center justify-center h-full">
              Hiện chưa có tập nào!
            </div>
          )}
        </div>

        {/* Chọn server */}
        {dataFilm.episodes.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {dataFilm.episodes.map((item: { server_name: string; items: { embed: string }[] }) => (
              <button
                title={`Server ${item.server_name}`}
                onClick={() => setNameServer(item.server_name)}
                key={item.server_name}
                className={classNames('rounded px-2 py-1 flex items-center justify-center gap-1 font-medium', {
                  'bg-white/40': item.server_name === nameServer,
                  'bg-white': item.server_name !== nameServer,
                })}
              >
                {item.server_name === nameServer && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-4 h-4 stroke-green-500 -ml-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                {item.server_name}
              </button>
            ))}
          </div>
        )}

        {/* Thông tin phim */}
        <div className="container px-4 mt-6">
          <div className="block md:flex items-center justify-between mb-10">
            <div>
              <h1 title={dataFilm.original_name} className="text-white text-5xl font-heading1 leading-[45px] mb-3">
                {dataFilm.original_name}
              </h1>
              <h2 title={dataFilm.name} className="text-[#b5b5b5] text-2xl break-all leading-[30px] mb-6">
                {dataFilm.name} (
                <Link
                  title={`Tìm kiếm ${dataFilm.category[3]?.list[0]?.name}`}
                  to={`${PATH.list}/${PATH.new}?year=${dataFilm.category[3]?.list[0]?.name}`}
                  className="text-[#428bca] hover:underline"
                >
                  {dataFilm.category[3]?.list[0]?.name || 'Đang cập nhật'}
                </Link>
                )
                
              </h2>

              {/* Chia sẻ Facebook */}
              <FacebookShareButton url={`https://cncphim.site/${PATH.film}/${slug}`}>
                <div
                  title="Chia sẻ phim miễn phí với Facebook"
                  className="text-white w-fit bg-[#485fc7] rounded-sm px-3 py-1 flex items-center justify-center gap-2"
                >
                  <svg className="fill-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                  </svg>
                  Chia sẻ
                </div>
              </FacebookShareButton>
            </div>

            {/* Quay lại trang chi tiết phim */}
            <Link to={`${PATH.film}/${slug}`} className="flex items-center gap-2 text-[#428bca] hover:text-lime-400 pt-6 md:pt-0">
              <svg className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M11.093 251.65l175.998 184C211.81 461.494 256 444.239 256 408v-87.84c154.425 1.812 219.063 16.728 181.19 151.091-8.341 29.518 25.447 52.232 49.68 34.51C520.16 481.421 576 426.17 576 331.19c0-171.087-154.548-201.035-320-203.02V40.016c0-36.27-44.216-53.466-68.91-27.65L11.093 196.35c-14.791 15.47-14.791 39.83 0 55.3z" />
              </svg>
              Về trang giới thiệu phim
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Film;
