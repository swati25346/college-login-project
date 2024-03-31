import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StaffDashboard.css'; // Import the CSS file

const StaffDashboard = () => {
  const [uploadHistory, setUploadHistory] = useState([]);

  useEffect(() => {
    const fetchUploadHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/upload-history');
        setUploadHistory(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUploadHistory();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`http://localhost:5000/uploads/${filename}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename.split('/').pop()); // Get the filename from the path
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
      alert('Error downloading resume');
    }
  };

  return (
    <div className="staff-dashboard-container">
      <h2>Student Details</h2>
      <table className="staff-dashboard-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Resume</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {uploadHistory.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleDownload(user.filename)}>Download</button>
              </td>
              <td>{new Date(user.uploadDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;
