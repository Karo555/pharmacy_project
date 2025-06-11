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
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import React, { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import MuiLink from "@mui/material/Link";

interface FormState {
    email: string;
    password: string;
}

interface FormErrors {
    [key: string]: string;
}

const LoginPage: React.FC = () => {
    const [form, setForm] = useState<FormState>({ email: "", password: "" });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);

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

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            alert("Logged in successfully!");
        }, 1000);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, rgb(18, 32, 90) 0%, rgb(75, 0, 130) 100%)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                pt: 10,
                fontFamily: '"Montserrat", sans-serif',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={4}
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "#eee",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                        <Avatar sx={{ bgcolor: "teal", width: 60, height: 60 }}>
                            <PersonOutlineIcon sx={{ fontSize: 32, color: "#fff" }} />
                        </Avatar>
                        <Typography variant="h3" fontWeight={600} color="#fff">
                            Welcome Back
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle1" color="gray" mb={4}>
                        Enter your credentials to access your dashboard
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Stack spacing={3}>
                            <TextField
                                label="Email Address"
                                name="email"
                                type="email"
                                fullWidth
                                variant="filled"
                                InputLabelProps={{ style: { color: "#bbb" } }}
                                InputProps={{
                                    style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon style={{ color: "teal" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                value={form.email}
                                onChange={handleChange}
                                required
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                variant="filled"
                                InputLabelProps={{ style: { color: "#bbb" } }}
                                InputProps={{
                                    style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyOutlinedIcon style={{ color: "teal" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                value={form.password}
                                onChange={handleChange}
                                required
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={submitting}
                                sx={{
                                    mt: 2,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    fontSize: 16,
                                    backgroundColor: "teal",
                                    "&:hover": {
                                        backgroundColor: "darkcyan",
                                    },
                                }}
                            >
                                {submitting ? "Signing In..." : "Log In"}
                            </Button>
                            <Typography align="center" sx={{ mt: 2, color: "#ccc" }}>
                                Don't have an account?{" "}
                                <MuiLink
                                    component={RouterLink}
                                    to="/register"
                                    underline="hover"
                                    sx={{ color: "teal", fontWeight: 500 }}
                                >
                                    Create one
                                </MuiLink>
                            </Typography>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginPage;
