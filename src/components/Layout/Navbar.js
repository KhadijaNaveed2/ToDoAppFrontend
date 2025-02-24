import React, { useState } from 'react';
import '../../index.css';
import { FaUser, FaHome, FaTasks } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { NavLink } from 'react-router-dom';

const Navbar = ({ onLoginRegisterClick }) => {
    const auth = useSelector(state => state.auth); 
    const dispatch = useDispatch();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleLogOut = () => {
        dispatch(logout()); 
        toast.success("Logout Successfully");
    };

    return (
        <nav className="navbar" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* Home Button */}
            <NavLink to="/" className="nav-item" style={{ color: "#0056b3", fontWeight: "bold" }}>
                <FaHome style={{ marginRight: "5px" }} /> Home
            </NavLink>

            {/* Tasks Dropdown */}
            <div className="nav-item dropdown" style={{ position: "relative" }}>
                <button 
                    className="nav-link dropdown-toggle" 
                    style={{ background: "none", border: "none", color: "#0056b3", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                    <FaTasks style={{ marginRight: "5px" }} /> Tasks
                </button>
                {dropdownVisible && (
                    <ul className="dropdown-menu" style={{
                        position: "absolute", top: "100%", left: "0",
                        background: "#f8f9fa", listStyle: "none", padding: "10px", 
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "5px"
                    }}>
                        <li>
                            <NavLink 
                                to="/tasks" 
                                className="dropdown-item" 
                                style={{ color: "#333", padding: "5px 10px", display: "block", fontWeight: "bold" }}
                                onClick={() => setDropdownVisible(false)}
                            >
                                All Tasks
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>

            {/* User Authentication */}
            {auth?.user ? (
                <div className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" to="#" style={{ color: "#0056b3", fontWeight: "bold" }}>
                        {auth.user.name}
                    </NavLink>
                    <div className="dropdown-menu">
                        <NavLink onClick={handleLogOut} to="/" className="dropdown-item" style={{ color: "#333", fontWeight: "bold" }}>
                            Logout
                        </NavLink>
                    </div>
                </div>
            ) : (
                <NavLink 
                    to="#login" 
                    onClick={onLoginRegisterClick} 
                    className="nav-item" 
                    style={{ color: "#0056b3", fontWeight: "bold" }}
                >
                    <FaUser style={{ marginRight: "5px" }} /> Login or Register
                </NavLink>
            )}
        </nav>
    );
}

export default Navbar;
