import React, { useState } from 'react';
import axios from 'axios';
import './StudentDashboard.css'; 

const StudentDashboard = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('filename', file);
    formData.append('username', username);
    console.log(username, file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      alert('Resume uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Error uploading resume');
    }
  };

  return (
    <div className="student-dashboard-container">
      <h4>Upload Your Resume Here:</h4>
      <form onSubmit={handleUpload} className="student-form">
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} className="form-input" />
        <input type="file" onChange={handleFileChange} className="form-input" />
        <button type="submit" className="upload-button">Upload Resume</button>
      </form>
    </div>
  );
};

export default StudentDashboard;
