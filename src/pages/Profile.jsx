import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { FaArrowLeft } from 'react-icons/fa';
import '../pages/Css/Profile.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add update profile logic here
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <button 
        onClick={handleBack}
        className="back-button"
        aria-label="Go back to homepage"
      >
        <FaArrowLeft /> Back to Home
      </button>
      
      <div className="profile-header">
        <div className="profile-header-content">
          <h1>My Profile</h1>
          <div className="profile-actions">
            <button onClick={handleLogout} className="btn-logout">
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          {isEditing && (
            <button className="change-photo-btn">Change Photo</button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <div className="form-value">{user.firstName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <div className="form-value">{user.lastName}</div>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="form-value">{user.email}</div>
          </div>

          {isEditing && (
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="form-control"
                placeholder="Enter current password to save changes"
              />
            </div>
          )}

          <div className="form-actions">
            {isEditing ? (
              <>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </>
            ) : (
              <button type="button" className="btn btn-edit" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
