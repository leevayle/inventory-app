function Welcome(){

    return(

        <>

            <div className="flex flex-col sm:flex-row w-[50vw] min-w-[300px] h-[70vh] m-auto shadow-lg rounded-xl border border-[var(--primary)] sm:min-w-[550px] ">
                <div className="sm:w-1/3 w-full bg-white rounded-tl-xl rounded-tr-xl sm:rounded-tr-none sm:rounded-bl-xl bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center">
                    <button className="m-4 p-2 bg-[var(--accent)] rounded shadow hover:bg-gray-100 cursor-pointer transition">Register</button>
                </div>
                <div className="flex-1 bg-gray-100  rounded-bl-xl rounded-br-xl sm:rounded-bl-none sm:rounded-tr-xl flex flex-col">
                    <p className="text-2xl font-bold text-center mt-10 text-[var(--primary)]">Welcome!</p>
                    <div className="flex flex-col w-80 m-auto h-80 rounded-xl ">
                        <input type="text" placeholder="email" className="w-70 h-9 rounded-xl border border-gray-300 p-2 text-center outline-0 focus:border-[var(--primary)] focus:w-72 transition-all m-auto focus-shadow"></input>
                        <input type="password" placeholder="Password" className="w-70 h-9 rounded-xl border border-gray-300 p-2 text-center  outline-0 focus:border-[var(--primary)] focus:w-72 transition-all m-auto focus-shadow"></input>
                        
                        
                        <button className="w-1/2 h-10 hover:w-2/3 bg-[var(--primary)] m-auto mt-20 rounded-3xl hover:bg-[var(--accent)] cursor-pointer transition-all hover:font-bold hover-shadow">Login</button>
                        <p className="m-auto text-gray-400">Forgot passeord? reset it.</p>
                    </div>
                    
                    
                </div>
            </div>
        
        </>

    );

}

export default Welcome;