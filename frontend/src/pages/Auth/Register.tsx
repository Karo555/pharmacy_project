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
    Card,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
    CircularProgress,
    Divider,
    Zoom,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import {
    PersonOutline,
    EmailOutlined,
    VpnKeyOutlined,
    Visibility,
    VisibilityOff,
    ArrowBack,
    HowToReg,
    Google as GoogleIcon,
    Facebook as FacebookIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import MuiLink from "@mui/material/Link";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{
        type: 'success' | 'error' | null;
        message: string | null;
    }>({ type: null, message: null });

    const validateField = (name: string, value: string): string => {
        let error = "";

        switch (name) {
            case "email":
                if (!value.trim()) error = "Email is required";
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                    error = "Email should be valid";
                break;

            case "password":
                if (!value) error = "Password is required";
                else if (value.length < 8) error = "Password must be at least 8 characters";
                break;

            case "confirmPassword":
                if (!value) error = "Please confirm your password";
                else if (value !== form.password) error = "Passwords do not match";
                break;
        }

        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        const error = validateField(name, value);
        if (error) {
            setErrors(prev => ({ ...prev, [name]: error }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        // Special check for confirmPassword when password changes
        if (name === 'password' && form.confirmPassword) {
            const confirmError = value !== form.confirmPassword ? "Passwords do not match" : "";
            if (confirmError) {
                setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.confirmPassword;
                    return newErrors;
                });
            }
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        Object.keys(form).forEach(key => {
            const error = validateField(key, form[key as keyof typeof form]);
            if (error) newErrors[key] = error;
        });

        if (!agreeToTerms) {
            newErrors.terms = "You must agree to the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        setStatusMessage({ type: null, message: null });

        try {
            const response = await axios.post('/api/auth/register', {
                email: form.email,
                password: form.password
            });


            const loginResp = await axios.post('/api/auth/login', {
                email: form.email,
                password: form.password,
            });

            const token = loginResp.data.token;

            // Show success message briefly before redirecting
            setStatusMessage({
                type: 'success',
                message: 'Registration successful! Redirecting to dashboard...'
            });

            setTimeout(() => {
                login(token);            // store token in context & localStorage
                navigate('/dashboard');  // redirect to protected dashboard
            }, 1500);

        } catch (e: any) {
            setStatusMessage({
                type: 'error',
                message: e.response?.data?.message || e.message || 'Registration failed'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                    {/* Left side - image/branding (visible only on medium screens and up) */}
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
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0.1,
                                    background: 'url(/pattern.png) repeat',
                                }}
                            />

                            <Box
                                component="img"
                                src="/logo.png"
                                alt="Logo"
                                sx={{
                                    height: 80,
                                    mb: 4,
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            />

                            <Typography
                                variant="h3"
                                align="center"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                Join Our Community
                            </Typography>

                            <Typography
                                variant="h6"
                                align="center"
                                sx={{
                                    opacity: 0.8,
                                    mb: 4,
                                    maxWidth: 400,
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                Create an account to access personalized health services and manage your prescriptions online.
                            </Typography>

                            <Box
                                component="img"
                                src="/register-illustration.png"
                                alt="Pharmacy Illustration"
                                sx={{
                                    maxWidth: '80%',
                                    maxHeight: 220,
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            />
                        </Box>
                    )}

                    {/* Right side - registration form */}
                    <Box
                        sx={{
                            flex: '1 1 50%',
                            p: { xs: 3, sm: 5 },
                            backgroundColor: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            maxHeight: { md: 700 },
                            overflow: { md: 'auto' },
                        }}
                    >
                        {/* Mobile header (only visible on small screens) */}
                        {!isMediumScreen && (
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <Box
                                    component="img"
                                    src="/logo.png"
                                    alt="Logo"
                                    sx={{ height: 60, mb: 2 }}
                                />
                                <Typography variant="h4" fontWeight={700} color="primary.main">
                                    Create Account
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Join our healthcare community
                                </Typography>
                            </Box>
                        )}

                        {/* Status messages */}
                        {statusMessage.type && (
                            <Zoom in={!!statusMessage.type}>
                                <Alert
                                    severity={statusMessage.type}
                                    sx={{ mb: 3 }}
                                    onClose={() => setStatusMessage({ type: null, message: null })}
                                >
                                    {statusMessage.message}
                                </Alert>
                            </Zoom>
                        )}

                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ mb: 3, display: { xs: 'none', md: 'block' } }}
                        >
                            Create your account
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Stack spacing={2.5}>
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
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
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleTogglePasswordVisibility}
                                                    edge="end"
                                                >
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />

                                <TextField
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
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
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={handleToggleConfirmPasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={agreeToTerms}
                                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            I agree to the{' '}
                                            <MuiLink component={RouterLink} to="/terms" underline="hover">
                                                Terms of Service
                                            </MuiLink>{' '}
                                            and{' '}
                                            <MuiLink component={RouterLink} to="/privacy" underline="hover">
                                                Privacy Policy
                                            </MuiLink>
                                        </Typography>
                                    }
                                    sx={{ mt: 1 }}
                                />
                                {errors.terms && (
                                    <Typography color="error" variant="caption">
                                        {errors.terms}
                                    </Typography>
                                )}

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        mt: 2,
                                        borderRadius: 28,
                                        py: 1.5,
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                        position: 'relative',
                                    }}
                                    endIcon={!loading && <HowToReg />}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>

                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ my: 2 }}
                                >
                                    <Divider sx={{ flex: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        or sign up with
                                    </Typography>
                                    <Divider sx={{ flex: 1 }} />
                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mb: 3 }}
                                >
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<GoogleIcon />}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.25,
                                            color: 'rgb(219, 68, 55)',
                                            borderColor: 'rgba(219, 68, 55, 0.5)',
                                            '&:hover': {
                                                borderColor: 'rgb(219, 68, 55)',
                                                backgroundColor: 'rgba(219, 68, 55, 0.04)',
                                            }
                                        }}
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<FacebookIcon />}
                                        sx={{
                                            borderRadius: 2,
                                            py: 1.25,
                                            color: 'rgb(66, 103, 178)',
                                            borderColor: 'rgba(66, 103, 178, 0.5)',
                                            '&:hover': {
                                                borderColor: 'rgb(66, 103, 178)',
                                                backgroundColor: 'rgba(66, 103, 178, 0.04)',
                                            }
                                        }}
                                    >
                                        Facebook
                                    </Button>
                                </Stack>

                                <Typography align="center" sx={{ color: 'text.secondary' }}>
                                    Already have an account?{" "}
                                    <MuiLink
                                        component={RouterLink}
                                        to="/login"
                                        underline="hover"
                                        sx={{ color: 'primary.main', fontWeight: 600 }}
                                    >
                                        Sign in
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

export default Register;