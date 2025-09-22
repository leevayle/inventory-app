import logo from '../assets/logo.png';

function Phone(){
    return(
        <>
            <div className="flex flex-col h-[85%] w-[90%] max-w-100 max-h-200">
                        <div className="flex m-auto mt-0 w-33 h-33 ">
                            <img className='flex m-auto ' src={logo}></img>
                        </div>
        
                        <div className='w-full h-auto mt-7 title flex flex-col '>
                            <div className='h-15 flex ml-auto mr-auto text-5xl'>
                                <p><span className='title1 '>Provide </span><span className='text-[var(--primary)]'>Phone</span><span className='title1 text-[var(--accent)]'>.</span></p>
                            </div>
        
                            <div className=' w-full h-5 flex mt-10'>
                                <div className=' flex w-9 h-2 rounded-4xl ml-auto self-center gradient'></div>
                                <div className=' flex w-9 h-2 rounded-4xl self-center ml-5 mr-5 gradient'></div>
                                <div className=' flex w-9 h-2 rounded-4xl mr-auto self-center bg-[var(--borders)]'></div>
        
                            </div>
        
                        </div>
                        <div className=' flex flex-1 flex-col'>
                            <form className='flex flex-col flex-1'>
                                <div className='flex flex-col h-50 pb-10 mt-10 justify-between '>
                                    <div className='text-[var(--text)] outline-none w-60 max-w-70 h-14 m-auto border border-[var(--borders)] text-center poppins rounded-4xl flex'>
                                    <select type='text' required className='border-0 active:border-0 outline-0  cursor-pointer w-auto pr-1 flex m-auto self-center'><option value="+254" selected>Kenya</option>
                                                                                                    <option value="+256">Uganda</option>  
                                                                                                    <option value="+1">United states</option> 
                                                                                                    <option value="+44" >United kingdom</option>
                                    </select>
                                    </div>
                                    <input type='text' placeholder='Phone number' required className='text-[var(--text)] outline-none w-60 max-w-70 h-14 m-auto border border-[var(--borders)] text-center poppins rounded-4xl'></input>
                                </div>
                            
                                <div className=' h-35 mt-auto flex flex-col'>
                                    <a href='/Email'>
                                        <div type='submit' className=' w-60 max-w-70 h-14 mr-auto ml-auto rounded-4xl mt-2 cursor-pointer flex text-white bg-[var(--accent)] hover:w-70 hover:bg-[var(--accent-l)] active:bg-[var(--primary)] transition-all'>
                                            
                                                <p className='w-full text-center self-center poppins text-xl '>Sign me up!</p>                           
                                            
                                        </div>
                                    </a>
                                    
                                    <a href=''  className='m-auto text-[var(--subtext)] poppins'><p >Can't see your country?</p></a>
            
                                </div>
                            </form>
        
                        </div>
                        
            </div>
        </>
    );

}

export default Phone;