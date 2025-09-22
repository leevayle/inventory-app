import logo from '../assets/logo.png';



function Trust(){
    return(
        <>
            <div className="flex flex-col h-[80%] w-[90%] max-w-100 max-h-200">
                <div className="flex m-auto mt-0 w-33 h-33 ">
                    <img className='flex m-auto ' src={logo}></img>
                </div>

                <div className='w-full h-auto mt-7 title flex flex-col'>
                    <div className='h-15 flex ml-auto mr-auto text-5xl'>
                        <p><span className='title1 '>Trust </span><span className='text-[var(--primary)]'>this </span><span className='title1 text-[var(--accent)]'>device?</span></p>
                    </div>
                    <div className=' w-full h-auto sub'>
                        <p className='text-center text-[var(--subtext)] mt-5'>If you trust it, you will be able to 
                                                                                login<br /> with your pin, after this first login. <br />
                                                                                If not, you will use your email and <br />
                                                                                password each time.</p>
                    </div>

                </div>
                <div className=' flex flex-1 flex-col'>
                    <div className=' h-45 mt-auto flex flex-col'>
                        <a href=''>
                        <div className=' w-60 max-w-70 h-14 mr-auto ml-auto rounded-4xl mt-2 cursor-pointer flex gradient hover:w-70 active:w-60 transition-all'>
                            <div className=' w-[75%] flex'>
                                <p className='w-full text-center self-center poppins text-xl text-white'>Trust device</p>
                            </div>
                            <div className=' rounded-4xl h-12 w-12 m-auto bg-white flex '>
                                <svg className='flex m-auto self-center rotate-45' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                    <path d="M17 7L6 18" stroke=" var(--primary)" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M11 6.13151C11 6.13151 16.6335 5.65662 17.4885 6.51153C18.3434 7.36645 17.8684 13 17.8684 13" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                            </div>
                                                        
                        </div>
                        </a>
                        <div className=' boxshaddow ml-auto mr-auto h-14 w-60 max-w-70 mt-8 rounded-4xl cursor-pointer flex text-[var(--primary)] hover:text-amber-50  hover:bg-[var(--primary)] transition-all'>
                            <p className='w-full text-center self-center poppins text-xl '>Don't trust!</p>
                        </div>

                    </div>

                </div>
                
            </div>

        

        </>
    );
}

export default Trust;