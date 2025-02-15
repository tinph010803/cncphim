// import { Card, Filter } from 'src/components';
import { Card } from 'src/components';
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
    videoSrc: "https://rr9---sn-8pxuuxa-i5oz7.googlevideo.com/videoplayback?expire=1739643698&ei=0oawZ8SPHqO02roP6syZ8A8&ip=171.243.48.191&id=o-ACbtuXR7f0F1gXC1zNwsHbkAKGJFQay_i9PLELkKPC8H&itag=137&aitags=134%2C136%2C137%2C160%2C243&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1739622098%2C&mh=C9&mm=31%2C29&mn=sn-8pxuuxa-i5oz7%2Csn-8pxuuxa-nbo6l&ms=au%2Crdu&mv=m&mvi=9&pl=24&rms=au%2Cau&gcr=vn&initcwndbps=2958750&bui=AUWDL3wF8GKFE2YPeiSdrouj3NWzpEStzKPkpgllSDyiY036p0dkhizwvbQbF-KWtTsa0HZBdDle2C7v&spc=RjZbSVLGkfGvzutPJee0RP7b_etlgdoCH8nK_rAD1xxeb3-4Ye29yc7Ho7gK_yk&vprv=1&svpuc=1&mime=video%2Fmp4&ns=0QDZNDyg9007YCEJjhHFlzQQ&rqh=1&gir=yes&clen=14759947&dur=45.666&lmt=1739176503009642&mt=1739621573&fvip=3&keepalive=yes&fexp=51326932%2C51331020&c=MWEB&sefc=1&txp=6209224&n=vYMhQQekZ2O20A&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhALbhdlaJs5rsJ8bTD_1J9T65nRIBNfeZSiKM7gPabbyWAiEAxpTOqXNUgu2JIyb0KQ2meubuaeOCT1LH-m7thlvvKpo%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=AGluJ3MwRQIgQ79d4pDiOnbDZ4wcmuQOiSgltIii5p4CCu8n2SQ8XPUCIQDAIOdqqReFfB8MZPDLrgcxccXse3i0cNoFY1gWTEpFuQ%3D%3D",
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

      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
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
        <div className="absolute inset-0  flex items-center px-8 lg:px-16 text-white">  {/* muốn video mờ thì thêm bg-black/60 */}
          <div className="max-w-lg">
            {/* Hiển thị vị trí video hiện tại */}
            <img src={currentVideo.logo} alt="Logo" className="w-[250px] md:w-[300px] lg:w-[350px] mb-4 mx-auto" />
            <p className="text-lg mt-4">{currentVideo.description}</p>
            <div className="mt-6 items-center justify-start space-x-4 sm:justify-center sm:space-x-2 sm:space-y-0">
              {/* Nút "Phát" */}
              <button
                className="bg-white hover:bg-gray-200 transition px-6 py-2 rounded-lg text-black font-semibold shadow-lg flex items-center justify-center space-x-2 
               sm:px-3 sm:py-1 sm:text-sm sm:w-auto"
                onClick={() => navigate(currentVideo.watchLink)}
                style={{ minWidth: "120px", display: "inline-flex" }} // Cố định kích thước nhỏ trên Mobile, inline-flex giúp tránh vỡ
              >
                <img src={playIcon} alt="Phát" className="w-5 h-5 sm:w-4 sm:h-4" />
                <span>Phát</span>
              </button>

              {/* Nút "Chi Tiết" */}
              <button
                className="bg-gray-600 hover:bg-gray-800 transition px-6 py-2 rounded-lg text-white font-semibold shadow-lg flex items-center justify-center space-x-2 
               sm:px-3 sm:py-1 sm:text-sm sm:w-auto"
                onClick={() => navigate(currentVideo.detailLink)}
                style={{ minWidth: "120px", display: "inline-flex" }} // Cố định kích thước nhỏ trên Mobile, inline-flex giúp tránh vỡ
              >
                <img src={info} alt="Chi Tiết" className="w-5 h-5 filter invert sm:w-4 sm:h-4" />
                <span>Chi Tiết</span>
              </button>
            </div>

          </div>
        </div>

        {/* Thumbnail Selection - Chỉ hiển thị trên Desktop ko hiển thị trên mobile */}
        <div className="hidden md:flex absolute bottom-5 right-5 space-x-2 bg-black/50 p-2 rounded-lg">
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
