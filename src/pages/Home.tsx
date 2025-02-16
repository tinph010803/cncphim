// import { Card, Filter } from 'src/components';
import { Card, Filter } from 'src/components';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import onePieceVideo from 'src/img/videos/one_piece_film_red.mp4';
import onePieceLogo from 'src/img/logo/one_piece_film_red.png';
import yournameLogo from 'src/img/logo/Your_name_movie_logo.png';
import yournameVideo from 'src/img/videos/your_name.mp4';
import jujussuLogo from 'src/img/logo/chu_thuat_hoi_chien.png';
import jujussuVideo from 'src/img/videos/chu_thuat_hoi_chien.mp4';
import saoggo2Logo from 'src/img/logo/sword_art_online_ggo2.png';
import saoggo2Video from 'src/img/videos/sword_art_online_ggo2.mp4';
import sutdygroupVideo from 'src/img/videos/study_group.mp4';
import playIcon from 'src/img/play.png';
import info from 'src/img/info.png';

const API_URL = import.meta.env.VITE_API_URL || 'https://phim.nguonc.com/api';

// Hàm gọi API danh sách phim
const fetchFilms = async (type: string, page = 1) => {
  const response = await axios.get(`${API_URL}/films/${type}?page=${page}`);
  return response.data;
};

const videoList = [
  {
    title: "Study group",
    videoSrc: sutdygroupVideo,
    logo: "https://i.postimg.cc/yYL48WTq/taoanhdep-sticker-8248.png",
    watchLink: "/xem-phim/hoc-sinh-ca-biet",
    detailLink: "/film/hoc-sinh-ca-biet",
    description: "Ga Min (Hwang Min Hyun), anh chàng có nắm đấm chắc nhưng kiến thức lỏng, quyết tâm lập nhóm học tập tại ngôi trường cá biệt để chinh phục giấc mơ đại học."
  },
  {
    title: "One Piece Film: Red",
    videoSrc: onePieceVideo,
    logo: onePieceLogo,
    watchLink: "/xem-phim/one-piece-film-red",
    detailLink: "/film/one-piece-film-red",
    description: "Uta, cựu nhạc sĩ của băng hải tặc Tóc Đỏ, muốn tạo ra một thế giới không có đau khổ thông qua âm nhạc của mình."
  },
  {
    title: "Your Name",
    videoSrc: yournameVideo,
    logo: yournameLogo,
    watchLink: "/xem-phim/ten-cau-la-gi",
    detailLink: "/film/ten-cau-la-gi",
    description: "Mitsuha Miyamizu, một nữ sinh trung học, khao khát được sống cuộc sống của một cậu bé ở thành phố Tokyo nhộn nhịp một giấc mơ hoàn toàn trái ngược với cuộc sống hiện tại của cô ở nông thôn."
  },
  {
    title: "Jujutsu Kaisen 0",
    videoSrc: jujussuVideo,
    logo: jujussuLogo,
    watchLink: "/xem-phim/chu-thuat-hoi-chien-0",
    detailLink: "/film/chu-thuat-hoi-chien-0",
    description: "Jujutsu Kaisen 0 là tiền truyện của Chú Thuật Hồi Chiến, xoay quanh Yuta Okkotsu khi anh mới vào học viện chú thuật. Bộ phim là bước mở đường cho các dự án tiếp theo, giúp làm rõ về các nguyền sư đặc cấp."
  },
  {
    title: "Sword Art Online Alternative: Gun Gale Online (Season 2)",
    videoSrc: saoggo2Video,
    logo: saoggo2Logo,
    watchLink: "/xem-phim/sword-art-online-ngoai-truyen-gun-gale-online-phan-2",
    detailLink: "/film/sword-art-online-ngoai-truyen-gun-gale-online-phan-2",
    description: "Gun Gale Online (Phần 2) theo chân Karen (Llenn) trong thế giới ảo, đối mặt thử thách, chiến đấu kịch tính và khám phá tình bạn lẫn lòng dũng cảm."
  },
];


const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // Lưu video hiện tại
  const currentVideo = videoList[currentIndex]; // Lấy thông tin video hiện tại

  // Chuyển video khi kết thúc
  const handleVideoEnd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length); // Quay vòng video
  };

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


  useEffect(() => {
    const video = document.getElementById("bgVideo") as HTMLVideoElement;
    if (video) {
      video.play().catch((error) => console.log("Autoplay bị chặn:", error));
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Xem phim Online miễn phí - CNCPhim</title>
        <meta
          name="description"
          content="Web xem phim online miễn phí lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia xem phim và thảo luận với hơn 10 triệu thành viên 🎉 tại CNCPhim ❤️💛💚"
        />
      </Helmet>
      {/* Hiển thị Filter trên Mobile */}
      <div className="md:hidden">
        <Filter />
      </div>
      {/* Chỉ hiển thị trên Desktop, Ẩn trên Mobile */}
      <div className="hidden md:block relative w-full h-[500px] lg:h-[600px] overflow-hidden">
        {/* Video background */}
        <video
          key={currentVideo.videoSrc}
          autoPlay
          loop={false} // Không lặp lại video, chuyển sang video tiếp theo khi kết thúc
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-90 transition-opacity duration-700 ease-in-out"
          onEnded={handleVideoEnd}
        >
          <source src={currentVideo.videoSrc} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>

        {/* Overlay + Nội dung */}
        <div className="absolute inset-0 flex items-center px-8 lg:px-16 text-white">
          <div className="max-w-lg">
            {/* Logo */}
            <img
              src={currentVideo.logo}
              alt="Logo"
              className="w-[250px] md:w-[300px] lg:w-[350px] mb-4 mx-auto"
            />
            <p className="text-lg mt-4">{currentVideo.description}</p>

            <div className="mt-6 flex items-center justify-start space-x-4">
              {/* Nút "Phát" */}
              <button
                className="bg-white hover:bg-gray-200 transition px-6 py-2 rounded-lg text-black font-semibold shadow-lg flex items-center justify-center space-x-2"
                onClick={() => navigate(currentVideo.watchLink)}
                style={{ minWidth: "120px", display: "inline-flex" }}
              >
                <img src={playIcon} alt="Phát" className="w-5 h-5" />
                <span>Phát</span>
              </button>

              {/* Nút "Chi Tiết" */}
              <button
                className="bg-gray-600 hover:bg-gray-800 transition px-6 py-2 rounded-lg text-white font-semibold shadow-lg flex items-center justify-center space-x-2"
                onClick={() => navigate(currentVideo.detailLink)}
                style={{ minWidth: "120px", display: "inline-flex" }}
              >
                <img src={info} alt="Chi Tiết" className="w-5 h-5 filter invert" />
                <span>Chi Tiết</span>
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Selection - Chỉ hiển thị trên Desktop */}
        <div className="absolute bottom-5 right-5 flex flex-row items-center space-x-2 bg-black/50 p-2 rounded-lg">
        {videoList.map((video, index) => (
            <img
              key={video.videoSrc}
              src={video.logo}
              alt={video.title}
              className={`w-16 h-10 cursor-pointer rounded-md transition border-2 ${currentIndex === index ? "border-white" : "border-transparent"
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>


      <div className="container mt-[45px] px-4">
        {/* <Filter /> */}
        {/* Phim Lẻ Mới Cập Nhật */}
        <div className="mt-8">
          {title({ title: 'Phim lẻ mới cập nhật', titleSmall: 'Phim lẻ mới', link: 'phim-le' })}
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-[22px] py-3">
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
