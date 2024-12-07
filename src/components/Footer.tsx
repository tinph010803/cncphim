


const Footer = () => {
  return (
    <footer className='bg-gray-200 dark:bg-gray-800 mt-20 bg-[url("/footer-bg.webp")]'>
      <div className='container space-y-8 overflow-hidden pt-12 pb-32'>
        
        <div className='flex justify-center mt-8 space-x-4'>
          <a
            // href='https://www.facebook.com/ducdo.210501/' // đưa link facebook
            rel='noopener noreferrer'
            target='_blank'
            className='text-gray-300 hover:text-gray-100'
          >
            <span className='sr-only'>Facebook</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='w-10 h-10'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
              />
            </svg>
          </a>
        </div>
        <p className='mt-8 text-2xl leading-6 text-center text-gray-500 dark:text-gray-300'>
          © {new Date().getFullYear()} - Sản phẩm này chỉ dùng cho mục đích học hỏi, không vì mục đích thương mại hay xâm phạm bản quyền.
        </p>
      </div>
      
    </footer>
  )
}
export default Footer
