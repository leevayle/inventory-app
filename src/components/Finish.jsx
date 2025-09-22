import logo from '../assets/logo.png';


function Finish(){
    return (
        <>
            <div className="flex flex-col h-[85%] w-[90%] max-w-100 max-h-200">
                            <div className="flex m-auto mt-0 w-33 h-33 ">
                                <img className='flex m-auto ' src={logo}></img>
                            </div>
            
                            <div className='w-full h-auto mt-7 title flex flex-col '>
                                <div className='h-15 flex ml-auto mr-auto text-5xl'>
                                    <p className='text-center'><span className='title1 '>And </span><span className='text-[var(--primary)]'>that's </span><span className='title1 text-[var(--accent)]'>it!</span></p>
                                </div>
            
                            <div className=' w-full h-auto sub'>
                            <p className='text-center text-[var(--subtext)] mt-5'>Now be patient for your admin to approve your sign up and you're all set! <br /> When you're approved, you can log in!</p>
                </div>
            
                            </div>
                            <div className=' flex flex-1 flex-col'>
                                
                                    
                                
                                    <div className=' h-35 mt-auto flex flex-col'>
                                        <a href='/Login'>
                                            <div type='submit' className=' w-60 max-w-70 h-14 mr-auto ml-auto rounded-4xl mt-2 cursor-pointer flex text-white bg-[var(--accent)] hover:w-70 hover:bg-[var(--accent-l)] active:bg-[var(--primary)] transition-all'>
                                                
                                                    <p className='w-full text-center self-center poppins text-xl '>Log in</p>                           
                                                
                                            </div>
                                        </a>
                                        
                
                                    </div>
                                
            
                            </div>
                                            
                    </div>
        </>
    );
}

export default Finish;