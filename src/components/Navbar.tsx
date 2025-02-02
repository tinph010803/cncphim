import PATH from '../utils/path';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="text-white">
      <ul className="flex items-center font-semibold text-base lg:text-lg gap-4">
        <li>
          <NavLink
            to={`${PATH.list}/phim-moi-cap-nhat`}
            className={({ isActive }) =>
              `px-2 py-4 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-white'
              } hover:text-blue-600`
            }
          >
            Phim Mới
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`${PATH.list}/phim-bo`}
            className={({ isActive }) =>
              `px-2 py-4 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-white'
              } hover:text-blue-600`
            }
          >
            Phim Bộ
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`${PATH.list}/phim-le`}
            className={({ isActive }) =>
              `px-2 py-4 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-white'
              } hover:text-blue-600`
            }
          >
            Phim Lẻ
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`${PATH.list}/tv-shows`}
            className={({ isActive }) =>
              `px-2 py-4 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-white'
              } hover:text-blue-600`
            }
          >
            TV Shows
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`${PATH.list}/hoat-hinh`}
            className={({ isActive }) =>
              `px-2 py-4 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-white'
              } hover:text-blue-600`
            }
          >
            Hoạt Hình
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
