import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Stack,
    Divider,
    Card,
    Alert,
    Zoom,
    CircularProgress,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    EmailOutlined,
    VpnKeyOutlined,
    Visibility,
    VisibilityOff,
    Login as LoginIcon,
    Google as GoogleIcon,
    Facebook as FacebookIcon,
    ArrowBack
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import { useAuth } from "../../hooks/useAuth";
import { login as apiLogin } from "../../api/auth";
import { LoginRequestDTO } from "types/auth";

interface FormState {
    email: string;
    password: string;
}

interface FormErrors {
    [key: string]: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState<FormState>({ email: "", password: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginStatus, setLoginStatus] = useState<{ type: 'success' | 'error' | null; message: string | null }>({
        type: null,
        message: null
    });

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const validateField = (name: string, value: string): string => {
        let error = "";
        if (name === "email") {
            if (!value.trim()) error = "Email is required";
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                error = "Email should be valid";
        }
        if (name === "password") {
            if (!value) error = "Password is required";
            else if (value.length < 6) error = "Password must be at least 6 characters";
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        Object.keys(form).forEach(key => {
            const error = validateField(key, form[key as keyof FormState]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        setLoginStatus({ type: null, message: null });

        try {
            const payload: LoginRequestDTO = {
                email: form.email,
                password: form.password,
            };
            const resp = await apiLogin(payload);
            login(resp.token);
            setLoginStatus({ type: 'success', message: 'Logged in successfully!' });
            navigate('/dashboard');
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message || 'Login failed';
            setLoginStatus({ type: 'error', message: msg });
        } finally {
            setSubmitting(false);
        }
    };

    const handleTogglePasswordVisibility = () => setShowPassword(v => !v);

    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a6cce, #6a00ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 4, md: 0 }, position: 'relative', overflow: 'hidden' }}>
            {/* Back to home link */}
            <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 2 }}>
                <Button component={RouterLink} to="/" startIcon={<ArrowBack />} sx={{ color: 'white', fontWeight: 500, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                    Back to Home
                </Button>
            </Box>

            <Container maxWidth="lg" sx={{ zIndex: 1, display: 'flex', justifyContent: 'center' }}>
                <Card elevation={24} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%', maxWidth: 1000, borderRadius: 4, overflow: 'hidden' }}>

                    {/* Left branding */}
                    {isMediumScreen && (
                        <Box sx={{ flex: '1 1 50%', background: 'linear-gradient(135deg, #13294B, #01579B)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                            <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 80, mb: 4 }} />
                            <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 2 }}>
                                Welcome Back
                            </Typography>
                            <Typography variant="h6" align="center" sx={{ opacity: 0.8, mb: 4, maxWidth: 400 }}>
                                Access your personal dashboard to manage prescriptions.
                            </Typography>
                            <Box component="img" src="/login-illustration.png" alt="Illustration" sx={{ maxWidth: '80%', maxHeight: 220 }} />
                        </Box>
                    )}

                    <Box sx={{ flex: '1 1 50%', p: { xs: 3, sm: 5 }, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {!isMediumScreen && (
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 60, mb: 2 }} />
                                <Typography variant="h4" fontWeight={700} color="primary.main">
                                    Welcome Back
                                </Typography>
                            </Box>
                        )}

                        {loginStatus.type && (
                            <Zoom in>
                                <Alert severity={loginStatus.type} sx={{ mb: 3 }} onClose={() => setLoginStatus({ type: null, message: null })}>
                                    {loginStatus.message}
                                </Alert>
                            </Zoom>
                        )}

                        <Typography variant="h5" fontWeight={600} sx={{ mb: 4, display: { xs: 'none', md: 'block' } }}>
                            Sign in to your account
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Stack spacing={3}>
                                <TextField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined /></InputAdornment> }}
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />

                                <TextField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><VpnKeyOutlined /></InputAdornment>,
                                        endAdornment: <InputAdornment position="end"><IconButton onClick={handleTogglePasswordVisibility}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment>,
                                    }}
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />

                                <Box sx={{ textAlign: 'right' }}>
                                    <MuiLink component={RouterLink} to="/password/reset" underline="hover" sx={{ color: 'primary.main' }}>
                                        Forgot password?
                                    </MuiLink>
                                </Box>

                                <Button fullWidth type="submit" variant="contained" size="large" disabled={submitting} endIcon={!submitting && <LoginIcon />}>
                                    {submitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                                </Button>

                                {/* social buttons omitted for brevity */}

                                <Typography align="center" sx={{ color: 'text.secondary' }}>
                                    Don't have an account?{' '}
                                    <MuiLink component={RouterLink} to="/register" underline="hover" sx={{ color: 'primary.main', fontWeight: 600 }}>
                                        Sign up
                                    </MuiLink>
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;