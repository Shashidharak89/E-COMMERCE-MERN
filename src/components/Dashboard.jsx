import React from 'react';
import './styles/Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
    
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Total Orders</h2>
          <p className="dashboard-card-value">129</p>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Earnings</h2>
          <p className="dashboard-card-value">₹45,360</p>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Products</h2>
          <p className="dashboard-card-value">55</p>
          
        </div>
      </div>
      <Link to="/login">LOGIN/SIGNUP</Link> <br /><br />
      <Link to="/profile">MY PROFILE</Link>
    </div>
  );
};

export default Dashboard;
