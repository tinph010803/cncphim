import { Link, NavLink, createSearchParams, useLocation } from "react-router-dom";
import PATH from "../utils/path";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { Navbar } from ".";

const Header = () => {
  const { pathname } = useLocation();
  const [OpenNav, setOpenNav] = useState<boolean>(false);
  const [header, setHeader] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = OpenNav ? "hidden" : "unset";
  }, [OpenNav]);

  useEffect(() => {
    setOpenNav(false);
  }, [pathname]);

  const handleChangeHeader = () => {
    setHeader(window.scrollY >= 80);
  };

  window.addEventListener("scroll", handleChangeHeader);

  return (
    <header
      className={`text-white sticky top-0 z-20 left-0 right-0 transition-all duration-300 ${
        header ? "bg-black/95" : "bg-transparent"
      }`}
    >
      <div className="px-4 h-[56px] overflow-hidden flex items-center justify-between">
        {/* Logo */}
        <div className="h-full flex items-center gap-4">
          <Link
            to={PATH.home}
            title="Phimmoi"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <h1 title="Web xem phim miễn phí lớn nhất Việt Nam" className="font-bold text-4xl text-rose-600">
              <img src="/phimmoi.png" alt="Phimmoi" />
            </h1>
          </Link>

          {/* Navbar desktop */}
          <div className="hidden md:block">
            <Navbar />
          </div>
        </div>

        {/* Tìm kiếm & Menu hamburger */}
        <div className="flex md:hidden items-center gap-1">
          {/* Tìm kiếm */}
          <NavLink
            title="Tìm phim miễn phí tại Phimmoi"
            to={{
              pathname: PATH.search,
              search: createSearchParams({ keyword: "", page: "1" }).toString(),
            }}
            className={({ isActive }) =>
              `hover:text-blue-600 hover:bg-blue-600/20 text-lg flex items-center justify-center gap-2 px-2 py-4 ${
                isActive ? "text-blue-600" : ""
              }`
            }
          >
            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z" />
            </svg>
          </NavLink>

          {/* Menu Hamburger */}
          <button
            title="Menu phim Phimmoi"
            onClick={() => setOpenNav((prev) => !prev)}
            className="flex flex-col gap-[5px] p-2"
          >
            <span
              className={classNames("block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300", {
                "rotate-45 translate-y-2": OpenNav,
                "rotate-0": !OpenNav,
              })}
            />
            <span
              className={classNames("block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300", {
                "opacity-0": OpenNav,
                "opacity-100": !OpenNav,
              })}
            />
            <span
              className={classNames("block w-6 h-[3px] rounded-full bg-gray-400 transition-all duration-300", {
                "-rotate-45 -translate-y-2": OpenNav,
                "rotate-0": !OpenNav,
              })}
            />
          </button>
        </div>

        {/* Menu Hamburger mở rộng */}
        <div
          className={`${
            OpenNav ? "translate-x-0" : "translate-x-full"
          } duration-200 transition-all bg-[#06121e] h-full block md:hidden p-4 pt-10 fixed z-50 inset-0 overflow-y-auto top-[56px]`}
        >
          <ul className="flex flex-col text-2xl">
            {[
              
              { title: "Phim Mới", path: `${PATH.list}/${PATH.new}` },
              { title: "Phim Bộ", path: `${PATH.list}/${PATH.series}` },
              { title: "Phim Lẻ", path: `${PATH.list}/${PATH.odd}` },
              { title: "TV Shows", path: `${PATH.list}/${PATH.tvShows}` },
              { title: "Hoạt Hình", path: `${PATH.list}/${PATH.anime}` },
            ].map(({ title, path }) => (
              <li key={title}>
                <NavLink
                  title={`Xem ${title} tại Phimmoi`}
                  to={{ pathname: `/${path}`, search: createSearchParams({ page: "1" }).toString() }}
                  className={({ isActive }) =>
                    `hover:text-blue-600 hover:bg-blue-600/20 block text-center p-4 ${
                      isActive ? "text-blue-600" : ""
                    }`
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
