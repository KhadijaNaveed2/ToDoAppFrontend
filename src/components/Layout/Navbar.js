import React, { useState, useRef, useEffect } from "react";
import "../../index.css";
import { FaUser, FaHome, FaTasks } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Navbar = ({ onLoginRegisterClick }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      {/* Home Button */}
      <NavLink to="/" className="nav-item" style={{ color: "#0056b3", fontWeight: "bold" }}>
        <FaHome style={{ marginRight: "5px" }} /> Home
      </NavLink>

      {/* Tasks Dropdown */}
      <div className="nav-item dropdown" style={{ position: "relative" }} ref={dropdownRef}>
  <button
    className="nav-link dropdown-toggle"
    style={{ background: "none", border: "none", color: "#0056b3", fontWeight: "bold", cursor: "pointer" }}
    onClick={() => setDropdownVisible(!dropdownVisible)}
  >
    <FaTasks style={{ marginRight: "5px" }} /> Tasks
  </button>
  
  <div
    className="dropdown-menu"
    style={{
      position: "absolute",
      background: "white",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      zIndex: 10,
      display: dropdownVisible ? "block" : "none",
    }}
  >
    <NavLink
      to="/create-tasks"
      className="dropdown-item"
      style={{ padding: "10px", color: "#0056b3", display: "block" }}
      onClick={() => setDropdownVisible(false)} 
    >
      Create Task
    </NavLink>
    <NavLink
      to="/all-tasks"
      className="dropdown-item"
      style={{ padding: "10px", color: "#0056b3", display: "block" }}
      onClick={() => setDropdownVisible(false)} 
    >
      ALL Tasks
    </NavLink>
  </div>
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
          to="#"
          onClick={(e) => {
            e.preventDefault();
            onLoginRegisterClick();
          }}
          className="nav-item"
          style={{ color: "#0056b3", fontWeight: "bold" }}
        >
          <FaUser style={{ marginRight: "5px" }} /> Login or Register
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
