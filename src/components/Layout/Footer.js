import React from 'react';
import { Link } from 'react-router-dom';
// import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, TwitterOutlined, WhatsAppOutlined } from '@ant-design/icons';
// import { Row, Col, Divider } from 'antd';
const Footer = () => {
  return (
    <div style={{ backgroundColor: '#fff7f2', padding: '40px 20px 0 20px', borderTop: '1px solid #d9d9d9', position: 'relative', bottom: '0', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', textAlign: 'left' }}>
       
        {/* <Col xs={24} sm={12} md={8} style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#333333', marginBottom: '10px' }}>INFORMATION AREA</h3>
         
        
          <p style={{ margin: '5px 0', fontSize: '16px' }}>
            <Link to="/contact" style={{ color: '#333', textDecoration: 'none' }}>
              Contact Us
            </Link>
          </p>
        </Col> */}

      </div>
      <div style={{ textAlign: 'center', color: '#333', padding: '10px 0' }}>
        <p style={{ margin: '0', fontSize: "25px" }}>All Rights Reserved &copy; ToDoAPP</p>
      </div>
    </div>
  );
};

export default Footer;
