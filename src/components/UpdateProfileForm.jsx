import React, { useState, useEffect } from 'react';

const UpdateProfileForm = ({ userId, onUpdate }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                const data = await response.json();
                setUserInfo(data);
                setFormData({
                    name: data.name,
                    email: data.email,
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {userInfo ? (
                <>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </>
            ) : (
                <p>Loading user information...</p>
            )}
        </form>
    );
};

export default UpdateProfileForm;
