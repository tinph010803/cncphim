import { Link } from 'react-router-dom';
import { items } from 'src/types';
import PATH from 'src/utils/path';

const Card = ({ data }: { data?: items }) => {
  if (!data) {
    return (
      <div className="h-[210px] sm:h-[384px] w-full mb-1 bg-gray-300 animate-spin flex flex-col">
        <div className="h5 w-full bg-gray-300 animate-spin"></div>
      </div>
    );
  }

  // Trích xuất `year` từ danh mục phim
  let year = "N/A";
  if (data.category && data.category["3"]?.list?.length > 0) {
    year = data.category["3"].list[0].name;
  }

  return (
    <Link to={`${PATH.film}/${data.slug}`} className="relative" title={data.name}>
      {/* Ảnh Thumbnail */}
      <img
        title={data.name}
        loading="eager"
        src={`${data.thumb_url}`}
        alt={data.name}
        className="h-[210px] sm:h-[384px] w-full object-cover mb-1"
      />

      {/* Hiển thị tập phim */}
      {data.current_episode && (
        <span className="text-white text-sm p-[2px] px-2 rounded-[4px] bg-yellow-600/80 absolute top-2 left-1">
          {data.current_episode}
        </span>
      )}

      {/* Tên phim */}
      <h3 title={data.name} className="text-white leading-6 line-clamp-1">
        {data.name}
      </h3>

      {/* Tên gốc + Năm phát hành */}
      <h3 title={data.original_name} className="text-white/40 leading-6 line-clamp-1">
        {data.original_name}
         {/* ({year !== "N/A" && <strong className="text-white/60">{year}</strong>}) */}
      </h3>
    </Link>
  );
};

export default Card;
