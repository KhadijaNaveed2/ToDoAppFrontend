import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLoginModal, closeLoginModal } from '../redux/slices/authSlice';
import LoginRegister from '../pages/Auth/LoginRegister';
import Layout from '../components/Layout/Layout';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.auth.isLoginModalOpen);

    const handleLoginRegisterClick = () => {
        dispatch(openLoginModal());
    };

    const handleCloseModal = () => {
        dispatch(closeLoginModal());
    };
 
    return (
        <Layout onLoginRegisterClick={handleLoginRegisterClick}>
            <div className="homepage" style={{ maxWidth: '1500px', margin: '0 auto', marginTop: "-20px", overflowX: 'hidden', position: 'relative' }}>
                <div className="main-content" style={{
                    filter: isModalOpen ? 'blur(5px)' : 'none',
                    transition: 'filter 0.3s ease',
                }}>
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
            </div>
        </Layout>
    );
};

export default HomePage;