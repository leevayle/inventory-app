import logo from '../assets/swift logo.png';
import codex from '../assets/codex logo.png';
import placeholder from '../assets/placeholder.webp';

function Dashboard() {
  return (
    <>
    <div className='w-full bg-[var(--bg)] h-full flex'>
    <div className=" flex m-auto flex-col w-[100%] h-[100%] bg-[var(--bg)] max-w-[2000px]">
      
      {/* Nav for dash */}
      <div className=' w-full h-25 flex '>
        <div className='h-20 w-25 flex m-auto ml-5 '><img className='h-full flex m-auto' src={logo} /></div>
        <div className='hidden xl:flex ml-auto mt-auto mb-auto rounded-4xl h-15 min-w-25 w-auto bg-[var(--b)] boxshaddow pl-1 pr-1 justify-between max-w-200'>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between bg-[var(--primary2)] pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 21.5V16.5C15 15.0858 15 14.3787 14.5607 13.9393C14.1213 13.5 13.4142 13.5 12 13.5C10.5858 13.5 9.87868 13.5 9.43934 13.9393C9 14.3787 9 15.0858 9 16.5V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p className='flex m-auto'>Home</p>
          </div>

          <a href="/Sell" className='m-auto'>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C19.6569 18 17.7712 18 14 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M16 22C14.8233 21.364 13.4571 21 12 21C10.5429 21 9.17669 21.364 8 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <p className='flex m-auto '>Sell</p>
          </div>
          </a>
          
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M5.33333 3.00001C7.79379 2.99657 10.1685 3.88709 12 5.5V21C10.1685 19.3871 7.79379 18.4966 5.33333 18.5C3.77132 18.5 2.99032 18.5 2.64526 18.2792C2.4381 18.1466 2.35346 18.0619 2.22086 17.8547C2 17.5097 2 16.8941 2 15.6629V6.40322C2 4.97543 2 4.26154 2.54874 3.68286C3.09748 3.10418 3.65923 3.07432 4.78272 3.0146C4.965 3.00491 5.14858 3.00001 5.33333 3.00001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.6667 3.00001C16.2062 2.99657 13.8315 3.88709 12 5.5V21C13.8315 19.3871 16.2062 18.4966 18.6667 18.5C20.2287 18.5 21.0097 18.5 21.3547 18.2792C21.5619 18.1466 21.6465 18.0619 21.7791 17.8547C22 17.5097 22 16.8941 22 15.6629V6.40322C22 4.97543 22 4.26154 21.4513 3.68286C20.9025 3.10418 20.3408 3.07432 19.2173 3.0146C19.035 3.00491 18.8514 3.00001 18.6667 3.00001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p className='flex m-auto'>Bills</p>
          </div>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M11.5 5C14.3284 5 15.7426 5 16.6213 5.87868C17.5 6.75736 17.5 8.17157 17.5 11C17.5 19 21.5 19 21.5 19H7.23863C6.91067 19 6.74668 19 6.37485 18.9032C6.00302 18.8063 5.94387 18.7733 5.82558 18.7072C4.6855 18.0702 2.5 16.1742 2.5 11C2.5 8.17157 2.5 6.75736 3.37868 5.87868C4.25736 5 5.67157 5 8.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.5 10V16C2.5 18.8284 2.5 20.2426 3.37868 21.1213C4.25736 22 5.67157 22 8.5 22H11.5761C14.4045 22 15.8188 22 16.6974 21.1213C17.1873 20.6314 17.4041 19.9751 17.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.5 3.5V6.5C11.5 6.96594 11.5 7.19891 11.4239 7.38268C11.3224 7.62771 11.1277 7.82239 10.8827 7.92388C10.6989 8 10.4659 8 10 8C9.53406 8 9.30109 8 9.11732 7.92388C8.87229 7.82239 8.67761 7.62771 8.57612 7.38268C8.5 7.19891 8.5 6.96594 8.5 6.5V3.5C8.5 3.03406 8.5 2.80109 8.57612 2.61732C8.67761 2.37229 8.87229 2.17761 9.11732 2.07612C9.30109 2 9.53406 2 10 2C10.4659 2 10.6989 2 10.8827 2.07612C11.1277 2.17761 11.3224 2.37229 11.4239 2.61732C11.5 2.80109 11.5 3.03406 11.5 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p className='flex m-auto'>Stock control</p>
          </div>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M18 13V21M22 17H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p className='flex m-auto'>Orders</p>
          </div>
        </div>
        <div className='xl:hidden hidden sm:hidden  md:flex ml-auto mt-auto mb-auto rounded-4xl h-15 min-w-25 w-auto bg-[var(--b)] boxshaddow pl-1 pr-1 justify-between max-w-200'>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between bg-[var(--primary2)] pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 21.5V16.5C15 15.0858 15 14.3787 14.5607 13.9393C14.1213 13.5 13.4142 13.5 12 13.5C10.5858 13.5 9.87868 13.5 9.43934 13.9393C9 14.3787 9 15.0858 9 16.5V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C19.6569 18 17.7712 18 14 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M16 22C14.8233 21.364 13.4571 21 12 21C10.5429 21 9.17669 21.364 8 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M5.33333 3.00001C7.79379 2.99657 10.1685 3.88709 12 5.5V21C10.1685 19.3871 7.79379 18.4966 5.33333 18.5C3.77132 18.5 2.99032 18.5 2.64526 18.2792C2.4381 18.1466 2.35346 18.0619 2.22086 17.8547C2 17.5097 2 16.8941 2 15.6629V6.40322C2 4.97543 2 4.26154 2.54874 3.68286C3.09748 3.10418 3.65923 3.07432 4.78272 3.0146C4.965 3.00491 5.14858 3.00001 5.33333 3.00001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.6667 3.00001C16.2062 2.99657 13.8315 3.88709 12 5.5V21C13.8315 19.3871 16.2062 18.4966 18.6667 18.5C20.2287 18.5 21.0097 18.5 21.3547 18.2792C21.5619 18.1466 21.6465 18.0619 21.7791 17.8547C22 17.5097 22 16.8941 22 15.6629V6.40322C22 4.97543 22 4.26154 21.4513 3.68286C20.9025 3.10418 20.3408 3.07432 19.2173 3.0146C19.035 3.00491 18.8514 3.00001 18.6667 3.00001Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M11.5 5C14.3284 5 15.7426 5 16.6213 5.87868C17.5 6.75736 17.5 8.17157 17.5 11C17.5 19 21.5 19 21.5 19H7.23863C6.91067 19 6.74668 19 6.37485 18.9032C6.00302 18.8063 5.94387 18.7733 5.82558 18.7072C4.6855 18.0702 2.5 16.1742 2.5 11C2.5 8.17157 2.5 6.75736 3.37868 5.87868C4.25736 5 5.67157 5 8.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.5 10V16C2.5 18.8284 2.5 20.2426 3.37868 21.1213C4.25736 22 5.67157 22 8.5 22H11.5761C14.4045 22 15.8188 22 16.6974 21.1213C17.1873 20.6314 17.4041 19.9751 17.5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.5 3.5V6.5C11.5 6.96594 11.5 7.19891 11.4239 7.38268C11.3224 7.62771 11.1277 7.82239 10.8827 7.92388C10.6989 8 10.4659 8 10 8C9.53406 8 9.30109 8 9.11732 7.92388C8.87229 7.82239 8.67761 7.62771 8.57612 7.38268C8.5 7.19891 8.5 6.96594 8.5 6.5V3.5C8.5 3.03406 8.5 2.80109 8.57612 2.61732C8.67761 2.37229 8.87229 2.17761 9.11732 2.07612C9.30109 2 9.53406 2 10 2C10.4659 2 10.6989 2 10.8827 2.07612C11.1277 2.17761 11.3224 2.37229 11.4239 2.61732C11.5 2.80109 11.5 3.03406 11.5 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M18 13V21M22 17H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>  
        </div>
        <div title='Drafts' className='hidden lg:flex m-auto  mr-1 ml-auto  rounded-4xl h-12 w-12 bg-[var(--borders)] hover:bg-[var(--primary-l)] transition-all boxshaddow cursor-pointer'>
          <div  className='rounded-4xl w-5 h-5 bg-[var(--accent-l)] flex justify-between text-gray-600 text-center border-3 border-[var(--bg)]'>
            <p className='flex m-auto text-[10px] bold '>2</p>
          </div>
          <svg className='h-5 w-5 mt-3 mr-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
            <path d="M14.4961 2.00027H9.49609C8.66766 2.00027 7.99609 2.67185 7.99609 3.50027C7.99609 4.3287 8.66766 5.00027 9.49609 5.00027H14.4961C15.3245 5.00027 15.9961 4.3287 15.9961 3.50027C15.9961 2.67185 15.3245 2.00027 14.4961 2.00027Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M7.99609 15.0003H11.4247M7.99609 11.0003H15.9961" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M15.9961 3.50027C17.5495 3.54709 18.4761 3.72035 19.1174 4.36164C19.9961 5.24032 19.9961 6.65451 19.9961 9.4829L19.9961 15.9997C19.9961 18.8282 19.9961 20.2424 19.1174 21.1211C18.2387 21.9997 16.8245 21.9997 13.9961 21.9997L9.99608 21.9997C7.16766 21.9997 5.75345 21.9997 4.87477 21.1211C3.9961 20.2424 3.99609 18.8282 3.99609 15.9998L3.9961 9.48296C3.99609 6.65453 3.99609 5.24031 4.87477 4.36163C5.51605 3.72034 6.4426 3.54708 7.99599 3.50027" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>

        <div className='flex m-auto ml-5 mr-5 rounded-4xl h-15 min-w-15 w-auto pl-2 pr-2 bg-[var(--b)] boxshaddow'>
          
          <div className=' h-12 w-12 flex m-auto rounded-4xl bg-[var(--borders-l)] relative'>
            <div title='Profile' className='h-full w-full overflow-hidden  rounded-4xl gradient absolute cursor-pointer'>
            <img className='h-full w-full ' src={placeholder} alt='profile'/>
          </div>
            <div className='rounded-4xl w-5 h-5 bg-amber-600 flex justify-between text-amber-50 text-center border-3 border-[var(--b)] z-1'>
            <p className='flex m-auto text-[10px] bold '>6</p>
          </div>
          
          
          </div>
          <div className='hidden w-auto min-w-5 poppins ml-2 pr-5 md:flex justify-between text-[var(--text)]'><p className='flex m-auto'>Username</p></div>
          <div title='Settings' className='hidden h-12 w-12 lg:flex m-auto rounded-4xl bg-[var(--borders-l)] ml-2 cursor-pointer  rotate-0 hover:rotate-180 ease-in-out transition-all'>
            <svg className='hidden md:flex m-auto h-7 w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  color="var(--text)" fill="none">
              <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>

          

        </div>
        
        {/* For mobile */}
        <div className='flex sm:hidden m-auto  mr-5 ml-1  rounded-4xl h-15 w-15 bg-[var(--b)] boxshaddow cursor-pointer overflow-hidden relative '>
          <select className='w-full h-full opacity-0 z-1 cursor-pointer'>
            <option>Home</option>
            <option>Sell</option>
            <option>Bills</option>
            <option>Stock control</option>
            <option>Orders</option>
          </select>
          <div className=' w-full h-full absolute flex'>

            <svg className='flex m-auto w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 21.5V16.5C15 15.0858 15 14.3787 14.5607 13.9393C14.1213 13.5 13.4142 13.5 12 13.5C10.5858 13.5 9.87868 13.5 9.43934 13.9393C9 14.3787 9 15.0858 9 16.5V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </div>
        </div>
        
      </div>

      <div className=' w-full block flex-1 overflow-y-auto '>        

        <div className='flex justify-between h-20'>
          <div className='border md:flex hidden border-[var(--subtext)] rounded-4xl w-auto h-15 mt-auto mb-auto ml-7 pr-1 '>
            <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--accent-l)] active:bg-[var(--accent)] transition-all ml-1 text-[var(--black)] hover:text-[var(--black)] bg-[var(--accent-l)] '>            
              <p className='flex m-auto '>Summary</p>
            </div>
            <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--accent-l)] active:bg-[var(--accent)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>            
              <p className='flex m-auto '>Reports</p>
            </div>
            <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--accent-l)] active:bg-[var(--accent)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>            
              <p className='flex m-auto '>Charts</p>
            </div>
            <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--accent-l)] active:bg-[var(--accent)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>            
              <p className='flex m-auto '>Revenue</p>
            </div>
            <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer hover:bg-[var(--accent-l)] active:bg-[var(--accent)] transition-all ml-1 text-[var(--text)] hover:text-[var(--black)]'>            
              <p className='flex m-auto '>Stock alerts</p>
            </div>
          </div>

          {/* For mobile screens */}
          <select className='md:hidden lg:hidden w-35 h-13 outline-0 border border-t-0 border-l-0 border-r-0 ml-7 pl-2 border-b-[var(--borders)] text-[var(--text)] cursor-pointer'>
            <option value={1}>Summary</option>
            <option value={2}>Reports</option>
            <option value={3}>Charts</option>
            <option value={4}>Revenue</option>
            <option value={5}>Stock alerts</option>
          </select>

           <input type='date' className='md:hidden lg:hidden w-35 h-13 outline-0 border border-t-0 border-l-0 border-r-0 mr-4 pl-2 border-b-[var(--borders)] text-[var(--text)] cursor-pointer'></input>

          

          <div title='Date range' className=' md:flex hidden rounded-4xl w-auto min-w-70 h-15 mt-auto mb-auto mr-2 bg-[var(--b)] boxshaddow'>
            <div className=' w-9 h-9 flex mt-auto mb-auto ml-3 ' >
              <svg className='flex self-center m-auto w-[90%]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M16 2V6M8 2V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 10H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.9955 14H12.0045M11.9955 18H12.0045M15.991 14H16M8 14H8.00897M8 18H8.00897" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <input type='date' className='flex m-auto ml-5 mr-5 h-full outline-0'></input>
          </div>
            
        </div>

        {/* Main dash area */}
      <div className='flex-1 p-6 space-y-6 poppins'>
        
        {/* Top Row Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          
          {/* Total Sales Card */}
          <div className="bg-[var(--b)] rounded-3xl p-5 flex flex-col justify-between boxshaddow h-50">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-black text-m bold">Total Sales</p>
                <p className="text-xs text-green-500">+2.5% from last month</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">
                 <svg className='w-5 h-5 text-gray-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.553-.44 1.278-.659 2.003-.659 1.5 0 2.805.954 3.372 2.341" /></svg>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <p className="text-3xl font-semibold">4,000,000.34</p>
              <div className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 transition-all cursor-pointer rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Items Sold Card */}
          <div className="bg-[var(--b)] rounded-3xl p-5 flex flex-col justify-between boxshaddow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-black text-m bold">Total Items Sold</p>
                <p className="text-xs text-green-500">+0.5% from last month</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">
                 <svg className='w-5 h-5 text-gray-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-5.513c.243-.729-.21-1.544-.986-1.544H5.64M4.5 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm12 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <p className="text-3xl font-semibold">2,206</p>
              <div className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 transition-all cursor-pointer rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total orders fulfilled Card */}
          <div className="bg-[var(--b)] rounded-3xl p-5 flex flex-col justify-between boxshaddow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-black text-m bold">Total orders fulfilled</p>
                <p className="text-xs text-red-500">-0.5% from last month</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">
                 <svg className='w-5 h-5 text-gray-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08H4.123a48.424 48.424 0 0 0-1.123.08C1.845 3.988 1 4.973 1 6.108v11.785c0 1.275 1.025 2.309 2.25 2.309H8.25M9 18h3.75m-3.75-3h3.75m-3.75-3h3.75M15 12v6m3-3H9" /></svg>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <p className="text-3xl font-semibold">34</p>
              <div className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 transition-all cursor-pointer rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Profits Card */}
          <div className="bg-[var(--b)] rounded-3xl p-5 flex flex-col justify-between boxshaddow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-black text-m bold">Total Profits</p>
                <p className="text-xs text-green-500">+2.5% from last month</p>
              </div>
              <div className="bg-gray-100 p-2 rounded-full">
                 <svg className='w-5 h-5 text-gray-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <p className="text-3xl font-semibold">492,034.26</p>
              <div className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 transition-all cursor-pointer rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row with Charts and other info */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Restock Card */}
          <div className="bg-[var(--b)] rounded-3xl p-5 boxshaddow col-span-1">
              <h3 className="font-bold text-lg mb-4">Restock soon!</h3>
  
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th scope="col" className="px-1 py-2 font-medium text-[var(--text)]">Item</th>
                      <th scope="col" className="px-1 py-2 font-medium text-[var(--text)] text-center">Remaining</th>
                      <th scope="col" className="px-1 py-2 font-medium text-[var(--text)]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-1 py-2">Blue Pen</td>
                      <td className="px-1 py-2 text-center">3</td>
                      <td className="px-1 py-2">
                        <button className="bg-[var(--primary)] hover:bg-[var(--primary-l)] transition-all text-[var(--black)] px-3 py-1 rounded-full text-xs ">
                          Order
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="px-1 py-2">Notebook</td>
                      <td className="px-1 py-2 text-center">7</td>
                      <td className="px-1 py-2">
                        <button className="bg-[var(--primary)] hover:bg-[var(--primary-l)] transition-all text-[var(--black)] px-3 py-1 rounded-full text-xs ">
                          Order
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-100">
                      <td className="px-1 py-2">Stapler</td>
                      <td className="px-1 py-2 text-center">4</td>
                      <td className="px-1 py-2">
                        <button className="bg-[var(--primary)] hover:bg-[var(--primary-l)] transition-all text-[var(--black)] px-3 py-1 rounded-full text-xs ">
                          Order
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center mt-6 cursor-pointer group">
                <p className="text-sm font-semibold mr-2 group-hover:underline">View full report here</p>
                <div className="w-8 h-8 bg-yellow-400 group-hover:bg-yellow-500 transition-all rounded-full"></div>
              </div>
            </div>

          {/* Sales Chart Card */}
            <div className="bg-[var(--b)] rounded-3xl p-5 boxshaddow col-span-1 lg:col-span-2 relative">
            <h3 className="font-bold text-lg mb-4 ml-5">Sales chart</h3>
  
              {/* Key for the chart */}
              <div className="absolute top-5 right-5 flex space-x-4 text-xs mr-5">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-100 rounded-full mr-1"></div>
                  <span>Total Sales</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-teal-400 rounded-full mr-1"></div>
                  <span>Profit</span>
                </div>
              </div>

              <div className="flex justify-around items-end h-48">
                <div className="text-center w-1/5 h-[80%] m-auto">
                  <div className="flex justify-center items-end h-full gap-2">
                    <div className="w-6 bg-cyan-100 rounded-t-lg" style={{ height: '75%' }}></div>
                    <div className="w-6 bg-teal-400 rounded-t-lg" style={{ height: '25%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">02 Aug</p>
                </div>
                <div className="text-center w-1/5 h-[80%] m-auto">
                  <div className="flex justify-center items-end h-full gap-2">
                    <div className="w-6 bg-cyan-100 rounded-t-lg" style={{ height: '15%' }}></div>
                    <div className="w-6 bg-teal-400 rounded-t-lg" style={{ height: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">01 Aug</p>
                </div>
                <div className="text-center w-1/5 h-[80%] m-auto">
                  <div className="flex justify-center items-end h-full gap-2">
                    <div className="w-6 bg-cyan-100 rounded-t-lg" style={{ height: '60%' }}></div>
                    <div className="w-6 bg-teal-400 rounded-t-lg" style={{ height: '40%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">31 Jul</p>
                </div>
                <div className="text-center w-1/5 h-[80%] m-auto">
                  <div className="flex justify-center items-end h-full gap-2">
                    <div className="w-6 bg-cyan-100 rounded-t-lg" style={{ height: '70%' }}></div>
                    <div className="w-6 bg-teal-400 rounded-t-lg" style={{ height: '30%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">30 Jul</p>
                </div>
              </div>
          </div>

          {/* Placeholder Card */}
          <div className="bg-[var(--b)] rounded-3xl p-5 boxshaddow col-span-1">
            <h3 className="font-bold text-lg mb-4">Expiring soon!</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th scope="col" className="px-1 py-2 font-medium text-[var(--black)]">Item</th>
                    <th scope="col" className="px-1 py-2 font-medium text-[var(--black)]">Exp-Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="px-1 py-2 text-[var(--text)]">Whole Wheat Bread</td>
                    <td className="px-1 py-2 text-[var(--text)]">28 Sep 2025</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="px-1 py-2 text-[var(--text)]">Milk</td>
                    <td className="px-1 py-2 text-[var(--text)]">28 Sep 2025</td>
                  </tr>
                  <tr className="hover:bg-gray-100">
                    <td className="px-1 py-2 text-[var(--text)]">Yogurt</td>
                    <td className="px-1 py-2 text-[var(--text)]">29 Sep 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div className="flex items-center mt-6 cursor-pointer group">
              <p className="text-sm font-semibold mr-2 group-hover:underline">View full report here</p>
              <div className="w-8 h-8 bg-yellow-400 group-hover:bg-yellow-500 transition-all rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
        

        
        

      </div> 
      {/* <div className='w-60 flex m-auto h-10 justify-center'>
          <p className='self-center poppins text-[var(--text)]'>A product of</p><img className='h-10 ' src={codex} />
      </div>  */}
    </div>
    </div>
    </>
  );
}

export default Dashboard;