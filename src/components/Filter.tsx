import { useParams, useNavigate, createSearchParams } from "react-router-dom";
import PATH from "src/utils/path";
import { useQueryConfig } from "src/hooks";

// Danh sách thể loại tĩnh (chưa có API riêng)
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
  { name: "Âu Mỹ", slug: "au-my" },
  { name: "Anh", slug: "anh" },
  { name: "Trung Quốc", slug: "trung-quoc" },
  { name: "Indonesia", slug: "indonesia" },
  { name: "Việt Nam", slug: "viet-nam" },
  { name: "Pháp", slug: "phap" },
  { name: "Hồng Kông", slug: "hong-kong" },
  { name: "Hàn Quốc", slug: "han-quoc" },
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
  const queryConfig = useQueryConfig();

  // ✅ Cập nhật filter khi chọn thể loại hoặc quốc gia
  const updateFilter = (newParams: Record<string, string>) => {
    navigate({
      pathname: `${PATH.list}/${type ? type : "phim-moi"}`,
      search: createSearchParams({
        ...queryConfig,
        ...newParams,
        page: "1",
      }).toString(),
    });
  };

  return (
    <div className="bg-[#0e274073] py-4 px-[22px] grid grid-cols-2 md:grid-cols-5 items-center gap-[22px] rounded-md">
      {/* Loại phim */}
      <FilterSelect
        label="Loại phim"
        value={type || ""}
        onChange={(e) => updateFilter({ type: e.target.value })}
        options={[
          { value: "phim-moi", label: "- Tất cả -" },
          { value: "phim-le", label: "Phim lẻ" },
          { value: "phim-bo", label: "Phim bộ" },
          { value: "hoat-hinh", label: "Hoạt hình" },
          { value: "tv-shows", label: "TV shows" },
        ]}
      />

      {/* Thể loại */}
      <FilterSelect
        label="Thể loại"
        value={queryConfig.category || ""}
        onChange={(e) => updateFilter({ category: e.target.value })}
        options={[
          { value: "", label: "- Tất cả -" },
          ...genresList.map((g) => ({ value: g.slug, label: g.name })),
        ]}
      />

     {/* Quốc gia */}
<FilterSelect
  label="Quốc gia"
  value={queryConfig.country || ""}
  onChange={(e) => updateFilter({ country: e.target.value })}
  options={[
    { value: "", label: "- Tất cả -" },
    ...countriesList.map((c) => ({ value: c.slug, label: c.name })),
  ]}
/>


      {/* Năm phát hành */}
      <FilterSelect
        label="Năm"
        value={queryConfig.year || ""}
        onChange={(e) => updateFilter({ year: e.target.value })}
        options={[
          { value: "", label: "- Tất cả -" },
          ...Array(14)
            .fill(0)
            .map((_, i) => ({ value: `${2023 - i}`, label: `${2023 - i}` })),
        ]}
      />

      {/* Sắp xếp */}
      <FilterSelect
        label="Sắp xếp"
        value={queryConfig.sort_field || "modified.time"}
        onChange={(e) => updateFilter({ sort_field: e.target.value })}
        options={[
          { value: "modified.time", label: "Ngày cập nhật" },
          { value: "year", label: "Ngày phát hành" },
          { value: "view", label: "Lượt xem" },
        ]}
      />
    </div>
  );
};

// ✅ Component Dropdown tái sử dụng
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
}) => {
  return (
    <div className="text-lg flex flex-col">
      <label className="mb-2 text-white">{label}:</label>
      <div className="relative w-full before:content-[''] before:absolute before:border-[3px] before:rounded-sm before:rotate-45 before:w-3 before:h-3 before:top-[25%] before:right-4 before:border-t-transparent before:border-l-transparent before:border-blue-600 before:z-[4]">
        <select
          onChange={onChange}
          value={value}
          className="cursor-pointer appearance-none w-full rounded-md outline-none py-[7px] pl-[11px] pr-[40px]"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
