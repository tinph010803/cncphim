import { useParams, useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import PATH from "src/utils/path";

const genresList = [
  { name: "Hành Động", slug: "hanh-dong" },
  { name: "Phiêu Lưu", slug: "phieu-luu" },
  { name: "Hoạt Hình", slug: "hoat-hinh" },
  { name: "Hài", slug: "hai" },
  { name: "Hình Sự", slug: "hinh-su" },
  { name: "Tài Liệu", slug: "tai-lieu" },
  { name: "Chính Kịch", slug: "chinh-kich" },
  { name: "Gia Đình", slug: "gia-dinh" },
  { name: "Giả Tưởng", slug: "gia-tuong" },
  { name: "Lịch Sử", slug: "lich-su" },
  { name: "Kinh Dị", slug: "kinh-di" },
  { name: "Nhạc", slug: "nhac" },
  { name: "Bí Ẩn", slug: "bi-an" },
  { name: "Lãng Mạn", slug: "lang-man" },
  { name: "Khoa Học Viễn Tưởng", slug: "khoa-hoc-vien-tuong" },
  { name: "Gây Cấn", slug: "gay-can" },
  { name: "Chiến Tranh", slug: "chien-tranh" },
  { name: "Tâm Lý", slug: "tam-ly" },
  { name: "Tình Cảm", slug: "tinh-cam" },
  { name: "Cổ Trang", slug: "co-trang" },
  { name: "Miền Tây", slug: "mien-tay" },
  { name: "Phim 18+", slug: "phim-18" },
];

const countriesList = [
  { name: "Việt Nam", slug: "viet-nam" },
  { name: "Hàn Quốc", slug: "han-quoc" },
  { name: "Âu Mỹ", slug: "au-my" },
  { name: "Anh", slug: "anh" },
  { name: "Trung Quốc", slug: "trung-quoc" },
  { name: "Indonesia", slug: "indonesia" },
  { name: "Pháp", slug: "phap" },
  { name: "Hồng Kông", slug: "hong-kong" },
  { name: "Nhật Bản", slug: "nhat-ban" },
  { name: "Thái Lan", slug: "thai-lan" },
  { name: "Đài Loan", slug: "dai-loan" },
  { name: "Nga", slug: "nga" },
  { name: "Hà Lan", slug: "ha-lan" },
  { name: "Philippines", slug: "philippines" },
  { name: "Ấn Độ", slug: "an-do" },
  { name: "Quốc gia khác", slug: "khac" },
];

const Filter = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const updateFilter = (newParams: Record<string, string>) => {
    const updatedParams = {
      ...Object.fromEntries(searchParams.entries()), // Giữ lại các bộ lọc khác
      ...newParams,
      page: "1",
    };

    let pathname = `${PATH.list}/${type || "phim-moi"}`;

    // ✅ Nếu chọn Loại Phim → Chuyển đến NavBar của loại phim
    if (newParams.type) {
      pathname = `${PATH.list}/${newParams.type}`;
    }

    navigate({
      pathname,
      search: createSearchParams(updatedParams).toString(),
    });
  };

  return (
    <div className="bg-[#0e274073] py-4 px-[22px] grid grid-cols-2 md:grid-cols-5 gap-[22px] rounded-md">
      {/* Loại phim */}
      <FilterSelect
        label="Loại phim"
        value={type || ""}
        onChange={(e) => updateFilter({ type: e.target.value })}
        options={[
          { value: "phim-moi-cap-nhat", label: "- Tất cả -" },
          { value: "phim-moi-cap-nhat", label: "Phim Mới" },
          { value: "phim-le", label: "Phim Lẻ" },
          { value: "phim-bo", label: "Phim Bộ" },
          { value: "hoat-hinh", label: "Hoạt Hình" },
          { value: "tv-shows", label: "TV Shows" },
        ]}
      />

      {/* Thể loại */}
      <FilterSelect
        label="Thể loại"
        value={searchParams.get("category") || ""}
        onChange={(e) => updateFilter({ category: e.target.value })}
        options={[{ value: "", label: "- Tất cả -" }, ...genresList.map((g) => ({ value: g.slug, label: g.name }))]}
      />

      {/* Quốc gia */}
      <FilterSelect
        label="Quốc gia"
        value={searchParams.get("country") || ""}
        onChange={(e) => updateFilter({ country: e.target.value })}
        options={[{ value: "", label: "- Tất cả -" }, ...countriesList.map((c) => ({ value: c.slug, label: c.name }))]}
      />

      {/* Năm phát hành */}
      <FilterSelect
        label="Năm"
        value={searchParams.get("year") || ""}
        onChange={(e) => updateFilter({ year: e.target.value })}
        options={[
          { value: "", label: "- Tất cả -" },
          ...Array(14)
            .fill(0)
            .map((_, i) => ({ value: `${2025 - i}`, label: `${2025 - i}` })),
        ]}
      />
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="text-lg flex flex-col">
    <label className="mb-2 text-white">{label}:</label>
    <div className="relative w-full">
      <select onChange={onChange} value={value} className="cursor-pointer appearance-none w-full rounded-md outline-none py-[7px] px-[11px]">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Filter;
