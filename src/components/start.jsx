
import logo from '../assets/logo.png';



function Start(){

    return(
        <>
            <div className="flex flex-col h-[80%] w-[90%] max-w-100 max-h-200">
                <div className="flex m-auto mt-0 w-33 h-33 ">
                    <img className='flex m-auto ' src={logo}></img>
                </div>

                <div className='w-full h-auto mt-7 title flex flex-col'>
                    <div className='h-15 flex ml-auto mr-auto text-5xl'>
                        <p><span className='title1 '>Sign_</span><span className='text-[var(--primary)]'>Up</span><span className='title1 text-[var(--accent)]'>!</span></p>
                    </div>

                    <div className=' w-full h-5 flex mt-10'>
                        <div className=' flex w-9 h-2 rounded-4xl ml-auto self-center gradient'></div>
                        <div className=' flex w-9 h-2 rounded-4xl self-center ml-5 mr-5 bg-[var(--borders)]'></div>
                        <div className=' flex w-9 h-2 rounded-4xl mr-auto self-center bg-[var(--borders)]'></div>

                    </div>

                </div>
                <div className=' flex flex-1 flex-col'>
                    <div className=' h-35 mt-auto flex flex-col'>
                        <a href='/Phone'><div className=' w-60 max-w-70 h-14 mr-auto ml-auto rounded-4xl mt-2 cursor-pointer flex text-white bg-[var(--accent)] hover:w-70 hover:bg-[var(--accent-l)] active:bg-[var(--primary)] transition-all'>
                            
                                <p className='w-full text-center self-center poppins text-xl '>Continue</p>                           
                            
                        </div></a>
                        
                        <a href='/Login' className='m-auto text-[var(--subtext)] poppins'><p >Login instead?</p></a>

                    </div>

                </div>
                
            </div>

        

        </>
    );
}

export default Start;