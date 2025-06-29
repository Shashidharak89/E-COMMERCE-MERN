import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Profile.css';
import SampleContext from '../contexts/SampleContext';

const Profile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { 
        URL, 
        userId, 
        setUserId,
        username, 
        setUsername,
        mail, 
        setMail,
        islogin, 
        setIslogin 
    } = useContext(SampleContext);
  // Sample user data - in a real app, this would come from props or state management
  const userData = {
    userId: userId,
    username: username,
    mail: mail
  };

  // If user is not logged in, show login prompt
  if (!islogin) {
    return (
      <div className="profile-container-wrapper">
        <div className="profile-login-card">
          <div className="profile-login-content">
            <div className="profile-login-icon">
              <svg 
                className="profile-lock-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M18 8H17V6C17 3.24 14.76 1 12 1S7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15S10.9 13 12 13S14 13.9 14 15S13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9S15.1 4.29 15.1 6V8Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="profile-login-title">Please Login First</h2>
            <p className="profile-login-message">
              You need to be logged in to view your account details.
            </p>
            <Link to="/login" className="profile-login-btn">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container-wrapper">
      <div className="profile-main-card">
        {/* Header Section */}
        <div className="profile-header-section">
          <h2 className="profile-title-text">My Account</h2>
          <div className="profile-title-underline"></div>
        </div>

        {/* Profile Content */}
        <div className="profile-content-area">
          {/* Profile Icon */}
          <div 
            className={`profile-avatar-container ${isHovered ? 'profile-avatar-hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="profile-icon-circle">
              <div className="profile-icon-inner">
                <svg 
                  className="profile-user-icon" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
                    fill="currentColor"
                  />
                  <path 
                    d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" 
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="profile-icon-glow"></div>
            </div>
          </div>

          {/* User Information Cards */}
          <div className="profile-info-grid">
            {/* ID Card */}
            <div className="profile-info-card profile-id-card">
              <div className="profile-card-header">
                <div className="profile-card-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="profile-card-title">User ID</h3>
              </div>
              <p className="profile-card-value">{userData.userId}</p>
            </div>

            {/* Name Card */}
            <div className="profile-info-card profile-name-card">
              <div className="profile-card-header">
                <div className="profile-card-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="profile-card-title">Username</h3>
              </div>
              <p className="profile-card-value">{userData.username}</p>
            </div>

            {/* Email Card */}
            <div className="profile-info-card profile-email-card">
              <div className="profile-card-header">
                <div className="profile-card-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="profile-card-title">Email Address</h3>
              </div>
              <p className="profile-card-value">{userData.mail}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="profile-actions-section">
          <button className="profile-btn profile-btn-primary">
            Edit Profile
          </button>
          <button className="profile-btn profile-btn-secondary">
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;