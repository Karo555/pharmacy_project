import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
    const { user, token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        surname: user?.surname || '',
        phoneNumber: user?.phoneNumber || '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateInputs = () => {
        if (!formData.name || !formData.surname || !formData.phoneNumber) {
            setMessage('All fields are required.');
            setSuccess(false);
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(formData.name)) {
            setMessage('Name must contain only letters.');
            setSuccess(false);
            return false;
        }
        if (!/^[a-zA-Z]+$/.test(formData.surname)) {
            setMessage('Surname must contain only letters.');
            setSuccess(false);
            return false;
        }
        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            setMessage('Phone number must be 10 digits.');
            setSuccess(false);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setLoading(true);
        try {
            await axios.put(`/api/users/${user?.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage('Profile updated successfully!');
            setSuccess(true);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile.');
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Update Profile</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Surname:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Phone Number:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <button className="form-button" type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
            {message && (
                <p className={`form-message ${success ? 'success' : 'error'}`}>{message}</p>
            )}
        </div>
    );
};

export default Profile;
