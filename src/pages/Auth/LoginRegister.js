import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice"; 
import ForgotPassword from './ForgetPassword.js';

const LoginRegister = ({ onClose }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneno, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');
    
const { user, token } = useSelector((state) => state.auth);

    const [isRegister, setIsRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegister
                ? 'http://localhost:5000/api/v1/auth/register'
                : 'http://localhost:5000/api/v1/auth/login';
            const data = isRegister
                ? { name, email, password, phoneno, address, answer }
                : { email, password };
    
            const res = await axios.post(endpoint, data);
            if (res.data && res.data.success) {
                toast.success(res.data.message);
                if (!isRegister) {
                    dispatch(setAuth({ user: res.data.user, token: res.data.token })); 
                    localStorage.setItem('auth', JSON.stringify(res.data)); 
                    navigate('/');
                } else {
                    setIsRegister(false);
                }
                onClose();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    

    const switchToRegister = () => {
        setIsRegister(true);
    };

    const switchToLogin = () => {
        setIsRegister(false);
    };

    const openForgotPasswordModal = () => {
        setShowForgotPassword(true);
    };

    const closeForgotPasswordModal = () => {
        setShowForgotPassword(false);
    };

    return (
        <Layout title={isRegister ? "Register - ToDo" : "Login - ToDo"}>
            {!showForgotPassword && (
                <div
                    className="modal-container"
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        background: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <div
                        className="modal-content"
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            zIndex: 1010,
                            maxWidth: '400px',
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        <button
                            className="modal-close"
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                            }}
                        >
                            ×
                        </button>
                        <div className="form-container">
                            <div className="form-header">
                                <button className={`form-tab ${!isRegister ? 'active' : ''}`} onClick={switchToLogin}>LOGIN</button>
                                <button className={`form-tab ${isRegister ? 'active' : ''}`} onClick={switchToRegister}>REGISTER</button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {isRegister && (
                                    <>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter Your Name"
                                                required
                                                style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={phoneno}
                                                onChange={(e) => setPhoneNo(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter Your Phone No"
                                                required
                                                style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="form-control"
                                                placeholder="Enter Your Address"
                                                required
                                                style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                value={answer}
                                                onChange={(e) => setAnswer(e.target.value)}
                                                className="form-control"
                                                placeholder="What is your Favourite Hobby?"
                                                required
                                                style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Your Email"
                                        required
                                        style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter Your Password"
                                        required
                                        style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', margin: '5px 0' }}>
                                    {isRegister ? "Register" : "Login"}
                                </button>
                                {!isRegister && (
                                    <div className="mb-3 text-center">
                                        <button
                                            type="button"
                                            className="btn btn-link"
                                            onClick={openForgotPasswordModal}
                                        >
                                            Lost password?
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showForgotPassword && <ForgotPassword onClose={closeForgotPasswordModal} />}
        </Layout>
    );
};

export default LoginRegister;
