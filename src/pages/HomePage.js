import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegister from "../pages/Auth/LoginRegister"
import Header from '../components/Layout/Header';
const HomePage = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [auth] = useAuth();


    const handleLoginRegisterClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // useEffect(() => {
    //     const handleResize = () => {
    //         const filterVisibility = window.innerWidth > 768;
    //         setShowFilters(filterVisibility);
    //     };

    //     window.addEventListener('resize', handleResize);
    //     handleResize(); // Initialize on mount

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    return (
        <div className="homepage" style={{ maxWidth: '1500px', margin: '0 auto', marginTop: "-20px", overflowX: 'hidden', position: 'relative' }}>
            {/* <Header onLoginRegisterClick={handleLoginRegisterClick} /> */}
            <div
                className="main-content"
                style={{
                    filter: isModalOpen ? 'blur(5px)' : 'none',
                    transition: 'filter 0.3s ease',
                }}
            >
               <div className="hero-section" style={{ position: 'relative', marginBottom: '20px' }}>
                    <video
                        className="Banner-video"
                        style={{ width: '100%', height: '700px', marginTop: "-80px" }}
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/images/tasks.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            </div>
            {isModalOpen && <LoginRegister onClose={handleCloseModal} />}

           
        </div >
    );
};

export default HomePage;
