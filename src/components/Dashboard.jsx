// src/components/Dashboard.jsx

import React from 'react';
import './styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Total Orders</h2>
          <p className="dashboard-card-value">128</p>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Earnings</h2>
          <p className="dashboard-card-value">₹45,300</p>
        </div>

        <div className="dashboard-card">
          <h2 className="dashboard-card-title">Products</h2>
          <p className="dashboard-card-value">54</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
