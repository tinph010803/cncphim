import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const SavedMovies = () => {
  interface Movie {
    id: number;
    slug: string;
    poster: string;
    title: string;
    original_name: string;
  }

  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("savedMovies") || "[]");
    setSavedMovies(movies);
  }, []);

  const removeMovie = (id: number) => {
    const updatedMovies = savedMovies.filter((movie) => movie.id !== id);
    setSavedMovies(updatedMovies);
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));

    // 🔔 Thêm thông báo khi xóa phim
    toast.success("Xóa phim đã lưu thành công!");
  };

  return (
    <div className="container px-4 mt-6">
      {/* Thông báo */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold text-white mb-4">Phim Đã Lưu</h2>

      {savedMovies.length === 0 ? (
        <p className="text-white text-center">Bạn chưa lưu phim nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="relative bg-gray-900 rounded-md overflow-hidden shadow-md transition hover:shadow-lg">
              
              {/* Ảnh phim */}
              <Link to={`/film/${movie.slug}`} className="block">
                <img
                  src={movie.poster || "/fallback-image.jpg"}
                  alt={movie.title}
                  className="h-[210px] sm:h-[384px] w-full object-cover transition"
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                />
              </Link>

              {/* Thông tin phim */}
              <div className="p-3">
                <h3 title={movie.title} className="text-white font-medium text-lg truncate">{movie.title}</h3>
                <h3 title={movie.original_name} className="text-white/40 text-sm truncate">{movie.original_name || "Không có tên gốc"}</h3>
              </div>

              {/* Nút Xóa */}
              <button
                onClick={() => removeMovie(movie.id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-600 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center transition duration-200 shadow-md"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedMovies;
