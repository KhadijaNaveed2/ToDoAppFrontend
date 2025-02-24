import React from 'react';
import Navbar from './Navbar';

const Header = ({ onLoginRegisterClick }) => {
  //   const [auth] = useAuth();
//   const userRole = auth.user?.role || 0;
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
    </header>
  );
}

export default Header;
