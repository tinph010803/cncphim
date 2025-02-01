import PATH from '../utils/path';
import { NavLink, createSearchParams } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="text-white">
      <ul className="flex items-center font-semibold text-base lg:text-lg gap-4">

        {/* Phim Mới */}
        <li>
          <NavLink
            title="Xem phim mới nhất tại Phimmoi"
            to={{
              pathname: `${PATH.list}/phim-moi-cap-nhat`,
              search: createSearchParams({ page: '1' }).toString(),
            }}
            className={({ isActive }) => `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive ? 'text-blue-600' : ''}`}
          >
            Phim Mới
          </NavLink>
        </li>

        {/* Phim Bộ */}
        <li>
          <NavLink
            title="Xem phim bộ hay nhất tại Phimmoi"
            to={{
              pathname: `${PATH.list}/phim-bo`,
              search: createSearchParams({ page: '1' }).toString(),
            }}
            className={({ isActive }) => `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive ? 'text-blue-600' : ''}`}
          >
            Phim Bộ
          </NavLink>
        </li>

        {/* Phim Lẻ */}
        <li>
          <NavLink
            title="Xem phim lẻ hay nhất tại Phimmoi"
            to={{
              pathname: `${PATH.list}/phim-le`,
              search: createSearchParams({ page: '1' }).toString(),
            }}
            className={({ isActive }) => `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive ? 'text-blue-600' : ''}`}
          >
            Phim Lẻ
          </NavLink>
          </li>
          {/* TV Shows */}
          <li>
            <NavLink
              title="Xem TV Shows hay nhất tại Phimmoi"
              to={{
                pathname: `${PATH.list}/tv-shows`,
                search: createSearchParams({ page: '1' }).toString(),
              }}
              className={({ isActive }) => `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive ? 'text-blue-600' : ''}`}
            >
              TV Shows
            </NavLink>
          </li>

          {/* Hoạt Hình */}
          <li>
            <NavLink
              title="Xem phim hoạt hình hay nhất tại Phimmoi"
              to={{
                pathname: `${PATH.list}/hoat-hinh`,
                search: createSearchParams({ page: '1' }).toString(),
              }}
              className={({ isActive }) => `hover:text-blue-600 hover:bg-blue-600/20 px-2 py-4 ${isActive ? 'text-blue-600' : ''}`}
            >
              Hoạt Hình
            </NavLink>
          </li>
          <li>
            <NavLink
              title='Tìm phim miễn phí tại Phimmoi'
              to={{
                pathname: PATH.search,
                search: createSearchParams({
                  keyword: '',
                  page: '1'
                }).toString()
              }}
              className={({ isActive }) =>
                `hover:text-blue-600 hover:bg-blue-600/20 flex items-center justify-center gap-2 px-2 py-4 ${isActive && ' text-blue-600'
                }`
              }
            >
              <svg className='w-4 h-4 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' />
              </svg>
            </NavLink>
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;
