import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Card,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
    Divider,
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
import { useAuth } from "../../hooks/useAuth";
import MuiLink from "@mui/material/Link";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import "../../styles/globals.css";

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
                if (!value.trim()) error = "Email address is required";
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                    error = "Please enter a valid email address (e.g., user@example.com)";
                break;

            case "password":
                if (!value) error = "Password is required";
                else if (value.length < 8) error = "Password must be at least 8 characters long";
                else if (!/(?=.*[a-z])/.test(value))
                    error = "Password must contain at least one lowercase letter";
                else if (!/(?=.*[A-Z])/.test(value))
                    error = "Password must contain at least one uppercase letter";
                else if (!/(?=.*\d)/.test(value))
                    error = "Password must contain at least one number";
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

        // Clear status messages when user starts typing again
        if (statusMessage.type === 'error') {
            setStatusMessage({ type: null, message: null });
        }

        // Delay validation to avoid validating while typing
        setTimeout(() => {
            const currentValue = (document.getElementsByName(name)[0] as HTMLInputElement)?.value;
            if (currentValue === value) {
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
            }
        }, 500);

        // Special check for confirmPassword when password changes
        if (name === 'password' && form.confirmPassword) {
            setTimeout(() => {
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
            }, 500);
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

    const getPasswordStrength = (password: string) => {
        // Basic password strength algorithm
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/(?=.*[a-z])/.test(password)) strength++;
        if (/(?=.*[A-Z])/.test(password)) strength++;
        if (/(?=.*\d)/.test(password)) strength++;
        if (/(?=.*[!@#$%^&*])/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthColor = (strength: number) => {
        switch (strength) {
            case 1:
            case 2:
                return 'error.main';
            case 3:
                return 'warning.main';
            case 4:
            case 5:
                return 'success.main';
            default:
                return 'transparent';
        }
    };

    const getPasswordStrengthLabel = (strength: number) => {
        switch (strength) {
            case 0:
                return '';
            case 1:
                return 'Very Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'Fair';
            case 4:
                return 'Strong';
            case 5:
                return 'Very Strong';
            default:
                return '';
        }
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
                            <Alert
                                type={statusMessage.type}
                                message={statusMessage.message || ''}
                                onClose={() => setStatusMessage({ type: null, message: null })}
                                isStatic={true}
                            />
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
                                        className: form.email ? "filled-input" : ""
                                    }}
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email || "We'll send a confirmation email to this address"}
                                    FormHelperTextProps={{
                                        sx: { opacity: errors.email ? 1 : 0.7 }
                                    }}
                                    onBlur={() => {
                                        if (form.email) {
                                            setErrors(prev => ({ ...prev, email: validateField("email", form.email) }));
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />

                                <Box>
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
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                        onClick={handleTogglePasswordVisibility}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            className: form.password ? "filled-input" : ""
                                        }}
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        error={!!errors.password}
                                        helperText={errors.password || "Use 8+ characters with a mix of letters, numbers & symbols"}
                                        FormHelperTextProps={{
                                            sx: { opacity: errors.password ? 1 : 0.7 }
                                        }}
                                        onBlur={() => {
                                            if (form.password) {
                                                setErrors(prev => ({ ...prev, password: validateField("password", form.password) }));
                                            }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                            }
                                        }}
                                    />

                                    {form.password && !errors.password && (
                                        <Box sx={{ mt: 1, mb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                                    Password strength:
                                                </Typography>
                                                <Box sx={{
                                                    display: 'flex',
                                                    width: '100%',
                                                    gap: 0.5
                                                }}>
                                                    {[...Array(4)].map((_, i) => (
                                                        <Box
                                                            key={i}
                                                            sx={{
                                                                height: 4,
                                                                flex: 1,
                                                                borderRadius: 1,
                                                                bgcolor: i < getPasswordStrength(form.password)
                                                                    ? getPasswordStrengthColor(getPasswordStrength(form.password))
                                                                    : 'rgba(0,0,0,0.1)'
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        ml: 1,
                                                        color: getPasswordStrengthColor(getPasswordStrength(form.password))
                                                    }}
                                                >
                                                    {getPasswordStrengthLabel(getPasswordStrength(form.password))}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>

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
                                                    aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                                                    onClick={handleToggleConfirmPasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        className: form.confirmPassword ? "filled-input" : ""
                                    }}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword || "Re-enter your password to confirm"}
                                    FormHelperTextProps={{
                                        sx: { opacity: errors.confirmPassword ? 1 : 0.7 }
                                    }}
                                    onBlur={() => {
                                        if (form.confirmPassword) {
                                            setErrors(prev => ({
                                                ...prev,
                                                confirmPassword: validateField("confirmPassword", form.confirmPassword)
                                            }));
                                        }
                                    }}
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
                                        <Spinner />
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

