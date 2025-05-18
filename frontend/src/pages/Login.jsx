import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
  const [credentials, setCreds] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', credentials);
      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 space-y-4">
      <input
        className="input input-bordered w-full"
        placeholder="Email"
        value={credentials.email}
        onChange={e => setCreds({ ...credentials, email: e.target.value })}
        required
      />
      <input
        className="input input-bordered w-full"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={e => setCreds({ ...credentials, password: e.target.value })}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <button className="btn btn-primary w-full">Login</button>
    </form>
  );
}
