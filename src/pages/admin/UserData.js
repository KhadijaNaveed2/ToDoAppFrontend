import React, { useEffect, useState } from "react";
import axios from 'axios';
import { List, Card, Spin, Alert } from 'antd';
import Layout from "../../components/Layout/Layout.js";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const auth = JSON.parse(localStorage.getItem("auth"));
        if (!auth?.token) {
          setError("No Token Found");
          setLoading(false);
          return;
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/users`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <Layout title={"DreamDecor - All Users"}>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        {/* Users List */}
        <div style={{ width: '40%' }}>
          <h1 style={{ textAlign: 'center', color: '#00A88E' }}>All Users</h1>
          {loading ? (
            <Spin size="large" />
          ) : error ? (
            <Alert message="Error" description={error} type="error" showIcon />
          ) : (
            <List
              bordered
              dataSource={users}
              renderItem={(user) => (
                <List.Item onClick={() => handleUserClick(user)} style={{ cursor: 'pointer', padding: '10px', backgroundColor: '#f5f5f5', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>{user.name}</span>
                </List.Item>
              )}
            />
          )}
        </div>

        {/* Selected User Details Card */}
        {selectedUser && (
          <Card title="User Details" style={{ width: '50%', background: '#ffffff', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phoneno}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default UserData;
