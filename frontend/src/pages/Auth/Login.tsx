import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Stack,
    Avatar,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
    Divider,
    Card,
    Alert,
    Zoom,
    CircularProgress,
} from "@mui/material";
import {
    PersonOutline,
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
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

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
            else if (value.length < 8) error = "Password must be at least 8 characters";
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {
            email: validateField("email", form.email),
            password: validateField("password", form.password),
        };
        Object.keys(newErrors).forEach((key) => {
            if (!newErrors[key]) delete newErrors[key];
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        setLoginStatus({ type: null, message: null });

        try {
            const response = await axios.post("/api/login", {
                email: form.email,
                password: form.password,
            });
            const token = response.data.token;
            login(token);
            setLoginStatus({ type: 'success', message: 'Logged in successfully!' });
            navigate("/dashboard");
        } catch (err: any) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Login failed";
            setLoginStatus({ type: 'error', message });
        } finally {
            setSubmitting(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0a6cce, #6a00ea)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 4, md: 0 },
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background pattern */}
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0.05,
                    background: 'url(/pattern.png) repeat',
                    zIndex: 0,
                }}
            />

            {/* Back to home link */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 2,
                }}
            >
                <Button
                    component={RouterLink}
                    to="/"
                    startIcon={<ArrowBack />}
                    sx={{
                        color: 'white',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        },
                    }}
                >
                    Back to Home
                </Button>
            </Box>

            <Container
                maxWidth="lg"
                sx={{
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Card
                    elevation={24}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        width: '100%',
                        maxWidth: 1000,
                        borderRadius: 4,
                        overflow: 'hidden',
                    }}
                >
                    {/* Left side – branding */}
                    {isMediumScreen && (
                        <Box
                            sx={{
                                flex: '1 1 50%',
                                background: 'linear-gradient(135deg, #13294B, #01579B)',
                                color: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 4,
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                component="img"
                                src="/logo.png"
                                alt="Logo"
                                sx={{ height: 80, mb: 4, position: 'relative', zIndex: 1 }}
                            />
                            <Typography
                                variant="h3"
                                align="center"
                                sx={{ fontWeight: 700, mb: 2, position: 'relative', zIndex: 1 }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography
                                variant="h6"
                                align="center"
                                sx={{ opacity: 0.8, mb: 4, maxWidth: 400, position: 'relative', zIndex: 1 }}
                            >
                                Access your personal dashboard to manage prescriptions.
                            </Typography>
                            <Box
                                component="img"
                                src="/login-illustration.png"
                                alt="Pharmacy Illustration"
                                sx={{ maxWidth: '80%', maxHeight: 220, position: 'relative', zIndex: 1 }}
                            />
                        </Box>
                    )}

                    {/* Right side – login form */}
                    <Box
                        sx={{
                            flex: '1 1 50%',
                            p: { xs: 3, sm: 5 },
                            backgroundColor: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        {!isMediumScreen && (
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 60, mb: 2 }} />
                                <Typography variant="h4" fontWeight={700} color="primary.main">
                                    Welcome Back
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Access your personal dashboard
                                </Typography>
                            </Box>
                        )}

                        {loginStatus.type && (
                            <Zoom in={!!loginStatus.type}>
                                <Alert
                                    severity={loginStatus.type}
                                    sx={{ mb: 3 }}
                                    onClose={() => setLoginStatus({ type: null, message: null })}
                                >
                                    {loginStatus.message}
                                </Alert>
                            </Zoom>
                        )}

                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ mb: 4, display: { xs: 'none', md: 'block' } }}
                        >
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <TextField
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VpnKeyOutlined color="primary" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />

                                <MuiLink component={RouterLink} to="/forgot-password" underline="hover" sx={{ alignSelf: 'flex-end', color: 'primary.main', fontWeight: 500, fontSize: '0.875rem' }}>
                                    Forgot password?
                                </MuiLink>

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={submitting}
                                    sx={{ mt: 2, borderRadius: 28, py: 1.5, fontWeight: 600, fontSize: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', position: 'relative' }}
                                    endIcon={!submitting && <LoginIcon />}
                                >
                                    {submitting ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                                </Button>

                                {/* Social buttons (no change) */}
                                <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 2 }}>
                                    <Divider sx={{ flex: 1 }} />
                                    <Typography variant="body2" color="text.secondary">or continue with</Typography>
                                    <Divider sx={{ flex: 1 }} />
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                                    <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ borderRadius: 2, py: 1.25, color: 'rgb(219, 68, 55)', borderColor: 'rgba(219, 68, 55, 0.5)', '&:hover': { borderColor: 'rgb(219, 68, 55)', backgroundColor: 'rgba(219, 68, 55, 0.04)' } }}>
                                        Google
                                    </Button>
                                    <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} sx={{ borderRadius: 2, py: 1.25, color: 'rgb(66, 103, 178)', borderColor: 'rgba(66, 103, 178, 0.5)', '&:hover': { borderColor: 'rgb(66, 103, 178)', backgroundColor: 'rgba(66, 103, 178, 0.04)' } }}>
                                        Facebook
                                    </Button>
                                </Stack>

                                <Typography align="center" sx={{ color: 'text.secondary' }}>
                                    Don't have an account?{" "}
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