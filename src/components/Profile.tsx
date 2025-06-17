import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const validateInputs = () => {
    if (!profileData.name || !profileData.email || !profileData.phone) {
      setMessage('All fields are required.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(profileData.email)) {
      setMessage('Invalid email format.');
      return false;
    }
    if (!/^\d{10}$/.test(profileData.phone)) {
      setMessage('Phone number must be 10 digits.');
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.put('/api/profile', profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is included
          'Content-Type': 'application/json', // Set content type
        },
      });
      setMessage('Profile updated successfully!');
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Authorization token:', localStorage.getItem('token')); // Log token for debugging
      console.error('Response details:', error.response); // Log response details
      console.log('Request headers:', {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      });
      console.log('Request payload:', profileData);
      console.error('Response headers:', error.response?.headers); // Log response headers
      console.error('Response status:', error.response?.status); // Log response status
      if (error.response) {
        setMessage(`Error: ${error.response.data}`);
      } else {
        setMessage('Unexpected error occurred.');
      }
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile();
        }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;