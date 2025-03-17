import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
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
  const [selectedEpisode, setSelectedEpisode] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { slug } = useParams();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [episodeNote, setEpisodeNote] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [savedNote, setSavedNote] = useState("");
  // Gọi API chi tiết phim
  const { data, isLoading, isError } = useQuery(['filmDetail', slug], () => fetchFilmDetails(slug as string), {
    staleTime: 3 * 60 * 1000,
    enabled: !!slug,
  });

  const dataFilm = data?.movie;
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
  const [isSeriesFilm, setIsSeriesFilm] = useState<boolean>(false);
  const [currentServerEpisodes, setCurrentServerEpisodes] = useState<{name: string; embed: string}[]>([]);

  useEffect(() => {
    if (dataFilm && dataFilm.episodes.length > 0) {
      const firstServer = dataFilm.episodes.find((server: { server_name: string; items: { name: string; embed: string }[] }) => server.items.length > 0);
      if (firstServer) {
        setNameServer(firstServer.server_name);
        setEpisode(firstServer.items[0]?.embed || '');
        setSelectedEpisode(firstServer.items[0]?.name || '');
        setCurrentServerEpisodes(firstServer.items);
        
        // Nếu có nhiều hơn 1 tập, đây là phim bộ
        setIsSeriesFilm(firstServer.items.length > 1);
        setCurrentEpisodeIndex(0);
      }
    }
  }, [dataFilm]);

  useEffect(() => {
    setStartTime(new Date().getTime());
  }, []);

  // Hàm lưu thời gian xem vào localStorage
  const saveWatchTime = () => {
    if (startTime) {
      const endTime = new Date().getTime();
      const watchedTime = Math.floor((endTime - startTime) / 1000); // Số giây đã xem

      if (watchedTime < 5) return; // Không lưu nếu xem quá ít

      const watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]");

      // Kiểm tra xem phim đã có trong lịch sử chưa
      const existingMovieIndex = watchHistory.findIndex(
        (movie: { id: string; episode: string }) => movie.id === dataFilm.id && movie.episode === selectedEpisode
      );

      if (existingMovieIndex !== -1) {
        watchHistory[existingMovieIndex].time += watchedTime;
      } else {
        watchHistory.push({
          id: dataFilm.id,
          slug: dataFilm.slug,
          poster: dataFilm.thumb_url,
          title: dataFilm.name,
          episode: selectedEpisode, // Lưu tập đang xem
          time: watchedTime,
        });
      }

      localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      saveWatchTime();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveWatchTime();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startTime, dataFilm, selectedEpisode]);


  const handleServerChange = (serverName: string) => {
    const newServer = dataFilm.episodes.find((s: { server_name: string; items: { name: string; embed: string }[] }) => s.server_name === serverName);
    if (newServer && newServer.items.length > 0) {
      // Lưu danh sách tập của server hiện tại
      setCurrentServerEpisodes(newServer.items);
      
      // Tìm tập phim trùng với tập hiện tại trên server mới
      const matchingEpisode = newServer.items.find((ep: { name: string; embed: string }) => ep.name === selectedEpisode);
      if (matchingEpisode) {
        // Nếu tìm thấy tập trùng thì giữ nguyên tập
        setEpisode(matchingEpisode.embed);
        // Tìm index của tập hiện tại trong server mới
        const newIndex = newServer.items.findIndex((ep: { name: string; embed: string }) => ep.name === selectedEpisode);
        setCurrentEpisodeIndex(newIndex !== -1 ? newIndex : 0);
      } else {
        // Nếu không có tập trùng, chọn tập đầu tiên của server mới
        setEpisode(newServer.items[0].embed);
        setSelectedEpisode(newServer.items[0].name);
        setCurrentEpisodeIndex(0);
      }
      setNameServer(serverName);
      
      // Kiểm tra xem đây có phải là phim bộ
      setIsSeriesFilm(newServer.items.length > 1);
    }
  };

  const handleEpisodeChange = (embedUrl: string, epName: string, index: number) => {
    setEpisode(embedUrl);
    setSelectedEpisode(epName);
    setCurrentEpisodeIndex(index);
    setStartTime(new Date().getTime()); // Reset thời gian xem khi đổi tập
  };

  // Hàm điều hướng đến tập trước
  const goToPreviousEpisode = () => {
    if (currentEpisodeIndex > 0) {
      const prevIndex = currentEpisodeIndex - 1;
      const prevEpisode = currentServerEpisodes[prevIndex];
      handleEpisodeChange(prevEpisode.embed, prevEpisode.name, prevIndex);
    }
  };

  // Hàm điều hướng đến tập tiếp theo
  const goToNextEpisode = () => {
    if (currentEpisodeIndex < currentServerEpisodes.length - 1) {
      const nextIndex = currentEpisodeIndex + 1;
      const nextEpisode = currentServerEpisodes[nextIndex];
      handleEpisodeChange(nextEpisode.embed, nextEpisode.name, nextIndex);
    }
  };

  // Load dữ liệu đã lưu trước đó
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`filmNote_${slug}`) || "null");
    if (savedData) {
      setEpisodeNote(savedData.episode);
      setMinutes(savedData.minutes);
      setSeconds(savedData.seconds);
      setSavedNote(`Tập: ${savedData.episode} - Đã xem đến: ${savedData.minutes} phút ${savedData.seconds} giây`);
    }
  }, [slug]);

  const saveNote = () => {
    if (!episodeNote || isNaN(parseInt(minutes)) || isNaN(parseInt(seconds))) {
      alert("Vui lòng nhập tập và thời gian hợp lệ!");
      return;
    }

    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  
    const noteData = {
      episode: episodeNote,
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
      totalSeconds: totalSeconds,
    };
  
    // Lưu ghi chú vào localStorage
    localStorage.setItem(`filmNote_${slug}`, JSON.stringify(noteData));
  
    // Cập nhật watchHistory trong localStorage
    const watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]");

    // Kiểm tra xem phim đã có trong danh sách chưa
    const movieIndex = watchHistory.findIndex((movie: { slug: string }) => movie.slug === slug);

    if (movieIndex !== -1) {
        watchHistory[movieIndex].episode = episodeNote;
        watchHistory[movieIndex].time = totalSeconds;
    } else {
        watchHistory.push({
            id: dataFilm.id,
            slug: dataFilm.slug,
            poster: dataFilm.thumb_url,
            title: dataFilm.name,
            episode: episodeNote,
            time: totalSeconds,
        });
    }

    localStorage.setItem("watchHistory", JSON.stringify(watchHistory));

    // Phát sự kiện để trang WatchHistory cập nhật ngay
    window.dispatchEvent(new Event("storage"));

    setSavedNote(`📌 Tập: ${episodeNote} - ⏳ ${formatTime(parseInt(minutes), parseInt(seconds))}`);
  };

  
  // Hàm định dạng thời gian hiển thị
  const formatTime = (m: number, s: number) => {
    return `${m}:${s < 10 ? `0${s}` : s}`;
  };
  
  if (isLoading) return <div className="text-white text-center mt-10">Đang tải thông tin phim...</div>;
  if (isError || !dataFilm) return <div className="text-red-500 text-center mt-10">Không tìm thấy phim!</div>;

  return (
    <>
      <Helmet>
        <title>{`CNCPhim | ${dataFilm.name} ${dataFilm.selectedEpisode}`}</title>
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

        {/* Điều hướng tập phim */}
        {isSeriesFilm && (
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={goToPreviousEpisode}
              disabled={currentEpisodeIndex === 0}
              className={classNames(
                'px-4 py-2 rounded flex items-center justify-center gap-2 font-medium',
                {
                  'bg-blue-500 text-white hover:bg-blue-600': currentEpisodeIndex > 0,
                  'bg-gray-600 text-gray-400 cursor-not-allowed': currentEpisodeIndex === 0,
                }
              )}
            >
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
              </svg>
              Tập trước
            </button>
            
            <div className="bg-gray-800 text-white px-4 py-2 rounded flex items-center">
              Tập: {selectedEpisode}
            </div>
            
            <button
              onClick={goToNextEpisode}
              disabled={currentEpisodeIndex === currentServerEpisodes.length - 1}
              className={classNames(
                'px-4 py-2 rounded flex items-center justify-center gap-2 font-medium',
                {
                  'bg-blue-500 text-white hover:bg-blue-600': currentEpisodeIndex < currentServerEpisodes.length - 1,
                  'bg-gray-600 text-gray-400 cursor-not-allowed': currentEpisodeIndex === currentServerEpisodes.length - 1,
                }
              )}
            >
              Tập sau
              <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
              </svg>
            </button>
          </div>
        )}

        {/* Chọn server */}
        {dataFilm.episodes.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {dataFilm.episodes.map((server: { server_name: string; items: { name: string; embed: string }[] }) => (
              <button
                key={server.server_name}
                title={`Server ${server.server_name}`}
                onClick={() => handleServerChange(server.server_name)}
                className={classNames(
                  'rounded px-2 py-1 flex items-center justify-center gap-1 font-medium',
                  {
                    'bg-blue-500 text-white': server.server_name === nameServer,
                    'bg-gray-800 text-white': server.server_name !== nameServer,
                  }
                )}
              >
                {server.server_name}
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
            <div className="mt-4 p-4 bg-gray-800 text-white rounded-md">
              <h3 className="text-lg font-bold mb-2">📌 Ghi chú thời gian xem</h3>

              {savedNote && <p className="text-green-400 mb-3">{savedNote}</p>}

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Tập số"
                  value={episodeNote}
                  onChange={(e) => setEpisodeNote(e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Phút"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="p-2 w-20 rounded bg-gray-700 text-white border border-gray-600"
                />
                <input
                  type="number"
                  placeholder="Giây"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="p-2 w-20 rounded bg-gray-700 text-white border border-gray-600"
                />
                <button
                  onClick={saveNote}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-bold"
                >
                  Lưu
                </button>
              </div>
            </div>

          </div>
          {/* Quay lại trang chi tiết phim */}
          <Link to={`${PATH.film}/${slug}`} className="flex items-center gap-2 text-[#428bca] hover:text-lime-400 pt-6 md:pt-0">
            <svg className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M11.093 251.65l175.998 184C211.81 461.494 256 444.239 256 408v-87.84c154.425 1.812 219.063 16.728 181.19 151.091-8.341 29.518 25.447 52.232 49.68 34.51C520.16 481.421 576 426.17 576 331.19c0-171.087-154.548-201.035-320-203.02V40.016c0-36.27-44.216-53.466-68.91-27.65L11.093 196.35c-14.791 15.47-14.791 39.83 0 55.3z" />
            </svg>
            Về trang giới thiệu phim
          </Link>
        </div>
        {/* Chọn tập */}
        {dataFilm.episodes.length > 0 && (
          <div className="container px-4 mt-6">
            <h2 className="text-white text-lg mb-2">Danh sách tập:</h2>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {dataFilm.episodes
                .find((server: { server_name: string; items: { name: string; embed: string }[] }) => server.server_name === nameServer)
                ?.items.map((ep: { name: string; embed: string }) => (
                  <button
                    key={ep.name}
                    className={classNames(
                      'p-2 border rounded text-white text-center cursor-pointer transition-all duration-300',
                      {
                        'bg-blue-500 border-blue-700': ep.name === selectedEpisode,
                        'bg-gray-800 border-gray-600': ep.name !== selectedEpisode,
                      }
                    )}
                    onClick={() => handleEpisodeChange(ep.embed, ep.name, currentServerEpisodes.findIndex(e => e.name === ep.name))}
                  >
                    {ep.name}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Film;
