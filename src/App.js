import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/Auth/LoginRegister';
import './index.css';
import CreateTasks from './pages/tasks/CreateTasks';
import AllTasks from './pages/tasks/AllTasks';
import EditTasks from './pages/tasks/EditTasks';
import Profile from "./pages/user/Profile.js";
import UserData from "./pages/admin/UserData.js";

const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginRegister />} />
        <Route path="/create-tasks" element={<CreateTasks />} />
        <Route path="/all-tasks" element={<AllTasks />} />
        <Route path="/edit-tasks" element={<EditTasks />} />
        <Route path="/user/profile" element={<Profile/>} />
        <Route path="/users" element={<UserData />} />
      </Routes>
    
  );
};

export default App;
