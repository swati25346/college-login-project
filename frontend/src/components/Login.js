
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: 'student',
  });
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', userData);
      console.log(response.data);
      if (userData.role === 'student') { // Access role from userData
        navigate('/student');
      } else if (userData.role === 'staff') { 
        navigate('/staff');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={userData.username} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={userData.role} onChange={handleInputChange}>
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
    </div>
  );
};

export default Login;
