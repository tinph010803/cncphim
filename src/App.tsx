import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PATH from './utils/path'
import { lazy, Suspense } from 'react'
import { MainLayout } from './layouts'
// Các page cần lazy load
const Home = lazy(() => import('./pages/Home'))
const List = lazy(() => import('./pages/List'))
const Search = lazy(() => import('./pages/Search'))
const Detail = lazy(() => import('./pages/Detail'))
const Film = lazy(() => import('./pages/Film'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const SavedMovies = lazy(() => import('./pages/SavedMovies'))
const WatchHistory = lazy(() => import('./pages/WatchHistory'))
// Loading Page Component
function LoadingPage() {
  return (
    <div role="status" className="flex h-screen flex-col items-center justify-center gap-2">
      <svg
        aria-hidden="true"
        className="mr-2 h-16 w-16 animate-spin fill-blue-600 text-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  )
}

// Hàm render Suspense chung cho lazy loading
import { ReactNode } from 'react';

function SuspenseWithFallback({ children }: { children: ReactNode }) {
  return <Suspense fallback={<LoadingPage />}>{children}</Suspense>
}


// Các route cho dự án
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <SuspenseWithFallback>
          <MainLayout />
        </SuspenseWithFallback>
      ), // MainLayout được bọc trong Suspense
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: PATH.home,
          element: <SuspenseWithFallback><Home /></SuspenseWithFallback>,
        },
        {
          path: `${PATH.list}/:type?`, // Thêm `:type?` vào đường dẫn
          element: <SuspenseWithFallback><List /></SuspenseWithFallback>,
        },
        {
          path: `${PATH.list}/${PATH.genres}/:slug`, // Thể loại phim
          element: <SuspenseWithFallback><List /></SuspenseWithFallback>,
        },
        {
          path: `${PATH.list}/${PATH.country}/:slug`, // Quốc gia
          element: <SuspenseWithFallback><List /></SuspenseWithFallback>,
        },

        {
          path: PATH.search,
          element: <SuspenseWithFallback><Search /></SuspenseWithFallback>,
        },
        {
          path: `${PATH.film}/${PATH.slug}`,
          element: <SuspenseWithFallback><Detail /></SuspenseWithFallback>,
        },
        {
          path: `${PATH.watch}/${PATH.slug}`,
          element: <SuspenseWithFallback><Film /></SuspenseWithFallback>,
        },
        {
          path: '/da-luu',
          element: <SavedMovies />, // Component hiển thị danh sách phim đã lưu
        },
        {
          path: '/lich-su',
          element: <WatchHistory />, // Hiển thị trang lịch sử xem
        },

      ],
    },
    {
      path: '/login',
      element: (
        <SuspenseWithFallback>
          <Login />
        </SuspenseWithFallback>
      ),
    },
    {
      path: '/register',
      element: (
        <SuspenseWithFallback>
          <Register />
        </SuspenseWithFallback>
      ),
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: '*',
          element: <SuspenseWithFallback><NotFound /></SuspenseWithFallback>,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default App

// 404 Page Not Found
export function NotFound() {
  return (
    <div role="status" className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-7xl md:text-9xl font-black text-primary">404</h2>
      <p className="text-3xl text-white">Không tìm thấy trang</p>
    </div>
  )
}

// 500 Error Boundary
function ErrorBoundary() {
  return (
    <main role="status" className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-7xl md:text-9xl font-black text-rose-600">500</h1>
      <p className="text-3xl text-white">Đã xảy ra lỗi</p>
      <a href="/" className="mt-4 rounded-lg bg-orange px-6 py-2 text-white text-xl shadow bg-rose-600">
        Trở về trang chủ
      </a>
    </main>
  )
}
