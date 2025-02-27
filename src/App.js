import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegister from './pages/Auth/LoginRegister';
import './index.css';
import CreateTasks from './pages/tasks/CreateTasks';
const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginRegister />} />
        <Route path="/create-tasks" element={<CreateTasks />} />
      </Routes>
    
  );
};

export default App;
