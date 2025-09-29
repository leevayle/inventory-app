import logo from '../assets/swift logo.png';
import codex from '../assets/codex logo.png';
import placeholder from '../assets/placeholder.webp';

function Sell() {
  return (
    <>
    <div className='w-full bg-[var(--bg)] h-full flex'>
    <div className="flex m-auto flex-col w-[100%] h-[100%] bg-[var(--bg)] max-w-[2000px]">
      
      {/* Nav for sell */}
      <div className=' w-full h-25 flex '>
        <div className='h-20 w-25 flex m-auto ml-5 '><img className='h-full flex m-auto' src={logo} /></div>
        <div className='hidden xl:flex ml-auto mt-auto mb-auto rounded-4xl h-15 min-w-25 w-auto bg-[var(--b)] boxshaddow pl-1 pr-1 justify-between max-w-200'>
          <a href="/Dashboard" className='m-auto'>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between  pl-5 pr-5 cursor-pointer hover:bg-[var(--primary)] transition-all text-[var(--text)] hover:text-[var(--black)]'>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 21.5V16.5C15 15.0858 15 14.3787 14.5607 13.9393C14.1213 13.5 13.4142 13.5 12 13.5C10.5858 13.5 9.87868 13.5 9.43934 13.9393C9 14.3787 9 15.0858 9 16.5V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p className='flex m-auto'>Home</p>
          </div>
          </a>
          <div className='flex rounded-4xl w-auto h-13 m-auto justify-between pl-5 pr-5 cursor-pointer bg-[var(--primary2)] hover:bg-[var(--primary)] transition-all ml-1 text-[var(--black)] '>
            <div className='flex w-5 h-5 m-auto mr-2'>
              <svg className='flex m-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#000000" fill="none">
                <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C19.6569 18 17.7712 18 14 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M16 22C14.8233 21.364 13.4571 21 12 21C10.5429 21 9.17669 21.364 8 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <p className='flex m-auto '>Sell</p>
          </div>
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
                    <p className='flex m-auto text-[10px] bold '>0</p>
                </div>
          
          
            </div>
          

          

        </div>
        
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
                <path d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10C22 13.7712 22 15.6569 20.8284 16.8284C19.6569 18 17.7712 18 14 18H10C6.22876 18 4.34315 18 3.17157 16.8284C2 15.6569 2 13.7712 2 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M16 22C14.8233 21.364 13.4571 21 12 21C10.5429 21 9.17669 21.364 8 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>

          </div>
        </div>
        
      </div>

      <div className=' w-full block flex-1 overflow-y-auto '> 

        {/* main sell area */}
       <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-[2fr_0.8fr] gap-4 w-full h-full p-4'>
          <div className='lg:col-span-1 grid grid-rows-3 gap-4'>
            <div className='row-span-2 border'></div>
            <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='col-span-1 w-full border'></div>
              <div className='col-span-1 w-full border'></div>
            </div>
          </div>
          <div className='lg:col-span-1 border'></div>
        </div>      

          
        

      </div> 
      {/* <div className='w-60 flex m-auto h-10 justify-center'>
          <p className='self-center poppins text-[var(--text)]'>A product of</p><a href='https://www.codex.co.ke' target='_blank'><img className='h-10 ' src={codex} /></a>
      </div>  */}
    </div>
    </div>
    </>
  );
}

export default Sell;