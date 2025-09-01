function Welcome(){

    return(

        <>

            <div className="flex w-[50vw] min-w-[450px] h-[70vh] m-auto shadow-lg rounded-xl">
                <div className="w-1/3 bg-gray-300 rounded-tl-xl rounded-bl-xl bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center">
                    <button className="m-4 p-2 bg-white rounded shadow hover:bg-gray-100">Home</button>
                </div>
                <div className="flex-1 bg-blue-100 rounded-tr-xl rounded-br-xl">

                </div>
            </div>
        
        </>

    );

}

export default Welcome;