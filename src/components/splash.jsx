
import React, { useEffect, useState } from 'react';
import loader from '../assets/2.gif';
import logo from '../assets/codex logo.png';
import swiftlogo from '../assets/swift logo.png';

function Splash(){
    const [visible, setVisible] = useState(false); // controls slide/fade
    const [showLoader, setShowLoader] = useState(false); // show loader after animation

    useEffect(() => {
        // trigger the animation on mount (slight delay ensures transition runs)
        const id = setTimeout(() => setVisible(true), 500);
        // preload images so they don't cause a delayed paint when shown
        const pre1 = new Image();
        pre1.src = loader;
        const pre2 = new Image();
        pre2.src = logo;
        const pre3 = new Image();
        pre3.src = swiftlogo;

        return () => clearTimeout(id);
    }, []);

    function handleTransitionEnd(e){
        // only respond to the transform/opacity transition from the logo wrapper
        if (e.propertyName === 'transform' || e.propertyName === 'opacity') {
            setShowLoader(true);
        }
    }

    const logoWrapStyle = {
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 1s ease, opacity 1s ease',
    };

    const bottomStyle = {
        transform: showLoader ? 'translateY(0)' : 'translateY(20px)',
        opacity: showLoader ? 1 : 0,
        transition: 'transform 1s ease, opacity 1s ease',
    };

    return(
        <>
        <div className=" w-auto h-auto flex min-h-full min-w-100 flex-col">
            <div className="width-20 flex mt-50" style={logoWrapStyle} onTransitionEnd={handleTransitionEnd}>
                <img src={swiftlogo} alt="Swift Logo" className="h-50 m-auto"/>
            </div>

            <div className="flex flex-1  ">
                {showLoader ? (
                    <img src={loader} alt="Loading..." className="w-20 mt-5 h-auto m-auto"/>
                ) : (
                    <div style={{height: 80}} />
                )}
            </div>

            <div className="flex m-auto mb-13" style={bottomStyle}>
                <p className='mt-1.5 text-gray-400'>System by </p>
                <a href="https://codex.co.ke" target='_blank' >
                {showLoader ? (
                    <img src={logo} alt="Swift Logo" className="w-25 h-auto m-auto"/>
                ) : (
                    <div style={{width: 100, height: 24}} />
                )}
                </a>
            </div>
        
        </div>
        </>
    );

  
}

export default Splash;
