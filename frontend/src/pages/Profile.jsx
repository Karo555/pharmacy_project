import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/auth/me').then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading…</p>;

  return (
    <div className="p-6 space-y-2">
      <h2 className="text-2xl font-bold">Welcome, {profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
}