import logo from '../assets/logo.png';

function Pin(){
    return(
        <>
            <div className="flex flex-col h-[85%] w-[90%] max-w-100 max-h-200">
                <div className="flex m-auto mt-0 w-33 h-33 ">
                    <img className='flex m-auto ' src={logo}></img>
                </div>
          
                <div className='w-full h-auto mt-7 title flex flex-col '>
                    <div className='h-15 flex ml-auto mr-auto text-5xl'>
                        <p className='text-center'><span className='title1 '>Welcome </span><span className='text-[var(--primary)]'>back <br /></span><span className='title1 text-[var(--accent)] '><span className='text-4xl '>~ </span>User</span></p>
                    </div>
          
                    <div className=' w-full h-auto sub'>
                    <p className='text-center text-[var(--subtext)] mt-10'></p>
                </div>
          
                </div>
                <div className=' flex flex-1 flex-col'>
                    <form className='flex flex-col flex-1'>
                        <div className='flex flex-col h-50 pb-10 mt-10 justify-between '>
                            
                
                            <input type='password' placeholder='Your Pin' required className='text-[var(--text)] outline-none w-60 max-w-70 h-14 m-auto border border-[var(--borders)] text-center poppins rounded-4xl'></input>
                        </div>
                    
                        <div className=' h-35 mt-auto flex flex-col'>
                            <a href='/Dashboard '>
                                <div type='submit' className=' w-60 max-w-70 h-14 mr-auto ml-auto rounded-4xl mt-2 cursor-pointer flex text-white bg-[var(--accent)] hover:w-70 hover:bg-[var(--accent-l)] active:bg-[var(--primary)] transition-all'>
                                    
                                        <p className='w-full text-center self-center poppins text-xl '>Login</p>                           
                                    
                                </div>
                            </a>
                            
                            <a href='/Login'  className='m-auto text-[var(--subtext)] poppins'><p >Use email instead?</p></a>
          
                        </div>
                    </form>
          
                </div>
                                          
            </div>
        </>
    );
}

export default Pin;