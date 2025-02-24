import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/forgot-password",
                { email, newPassword, answer }
            );
            if (res.data && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
                onClose();
            } else {
                toast.error(res.data.message);
            };
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        };
    };

    return (
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
                    <form onSubmit={handleSubmit}>
                        <h3 className="title">RESET PASSWORD</h3>
                        <div className="mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Enter Your Email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control"
                                placeholder="Enter Your favourite Hobby"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control"
                                placeholder="Enter New Password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            RESET
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
