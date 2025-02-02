import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WatchHistory = () => {
    interface Movie {
        id: number;
        slug: string;
        poster: string;
        title: string;
        episode?: string; // Tập đã xem (mặc định rỗng nếu không có)
        time: number; // Thời gian đã xem (giây) (mặc định rỗng nếu không có)
    }

    const [watchHistory, setWatchHistory] = useState<Movie[]>([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("watchHistory") || "[]");
    
        // **Lấy Ghi Chú từ localStorage & cập nhật dữ liệu**
        const updatedHistory = history.map((movie: Movie) => {
            const savedNote = JSON.parse(localStorage.getItem(`filmNote_${movie.slug}`) || "null");
    
            return {
                ...movie,
                episode: savedNote?.episode || "", // Nếu không nhập tập → Rỗng
                time: savedNote ? savedNote.totalSeconds : undefined, // Lấy tổng giây chính xác
            };
        });
    
        setWatchHistory(updatedHistory);
    }, []);
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]");
            setWatchHistory(updatedHistory);
        };
    
        window.addEventListener("storage", handleStorageChange);
        
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    
    
    // Định dạng thời gian
    const formatTime = (seconds: number) => {
      if (!seconds) return "Chưa ghi chú";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
    
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };
    

    const removeHistory = (id: number) => {
        const updatedHistory = watchHistory.filter((movie) => movie.id !== id);
        setWatchHistory(updatedHistory);
        localStorage.setItem("watchHistory", JSON.stringify(updatedHistory));
    };

   

    return (
        <div className="container px-4 mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">Lịch Sử Xem</h2>

            {watchHistory.length === 0 ? (
                <p className="text-white text-center">Bạn chưa xem phim nào.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {watchHistory.map((movie) => (
                        <div key={movie.id} className="relative group">
                            <Link to={`/xem-phim/${movie.slug}`} className="block">
                                <img
                                    src={movie.poster || "/fallback-image.jpg"}
                                    alt={movie.title}
                                    className="h-[210px] sm:h-[384px] w-full object-cover mb-1 rounded-md transition group-hover:opacity-80"
                                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                                />
                            </Link>

                            <h3 title={movie.title} className="text-white leading-6 text-left font-semibold">
                                {movie.title}
                            </h3>

                            {/* Nếu có tập đã xem thì hiển thị, nếu không thì bỏ qua */}
                            {movie.episode && <p className="text-white text-sm">📌 Tập: {movie.episode}</p>}

                            {/* Nếu có thời gian xem thì hiển thị, nếu không thì bỏ qua */}
                            {movie.time !== undefined && (
                                <p className="text-yellow-400">⏳ Đã xem đến: {formatTime(movie.time)}</p>
                            )}

                            <button
                                onClick={() => removeHistory(movie.id)}
                                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
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

export default WatchHistory;
