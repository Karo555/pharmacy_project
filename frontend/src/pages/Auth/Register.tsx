import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]       = useState<string | null>(null);
    const [loading, setLoading]   = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post('/api/register', {
                username,
                email,
                password,
                // default role USER
                role: 'USER',
            });
            // register returns { userId, username, role }
            // we need to login to get the token
            // assuming /api/login accepts same username + password
            const loginResp = await axios.post('/api/login', {
                username,
                password,
            });
            const token = loginResp.data.token;
            login(token);            // store token in context & localStorage
            navigate('/dashboard');  // redirect to protected dashboard
        } catch (e: any) {
            setError(
                e.response?.data?.message ||
                e.message ||
                'Registration failed'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={2}>
                    <TextField
                        label="Username"
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? 'Registering…' : 'Register'}
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/login"
                        variant="text"
                        fullWidth
                    >
                        Already have an account? Log in
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default Register;