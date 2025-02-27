import React from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Header = ({ onLoginRegisterClick }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth); 
  const userRole = auth.user?.role || 0; 
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '15px 25px', height: '70px', backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: '22px'
    }}>
      <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#333' }}>
        ToDoAPP
      </div>
      <Navbar onLoginRegisterClick={onLoginRegisterClick} />
     
      {auth.user && (
        <button 
          onClick={() => dispatch(logout())} 
          style={{ marginLeft: '20px', padding: '5px 10px', cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
