import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Chip,
    Stack,
    Avatar,
    InputAdornment,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const rolesList = ["USER", "ADMIN", "PHARMACIST"];

const initialForm = {
    firstName: "",
    lastName: "",
    address: "",
    age: "",
    email: "",
    password: "",
    phoneNumber: "",
    roles: [] as string[],
};

const nameRegex = /^[\p{L} '-]+$/u;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,100}$/;
const phoneRegex = /^\+?[0-9]{7,15}$/;

export default function RegisterPage() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateField = (name: string, value: string) => {
        let error = "";

        if (name === "firstName" || name === "lastName") {
            if (!value.trim()) {
                error = `${name === "firstName" ? "First" : "Last"} name is required`;
            } else if (value.length > 50) {
                error = `${name === "firstName" ? "First" : "Last"} name must not exceed 50 characters`;
            } else if (!nameRegex.test(value)) {
                error = `${
                    name === "firstName" ? "First" : "Last"
                } name can only contain letters, spaces, hyphens, and apostrophes`;
            }
        }

        if (name === "address") {
            if (!value.trim()) {
                error = "Address is required";
            } else if (value.length > 255) {
                error = "Address must not exceed 255 characters";
            }
        }

        if (name === "age") {
            if (value === "") {
                error = "Age is required";
            } else {
                const ageNum = Number(value);
                if (isNaN(ageNum) || ageNum < 0) {
                    error = "Age must be non-negative";
                } else if (ageNum > 150) {
                    error = "Age must be realistic";
                }
            }
        }

        if (name === "email") {
            if (!value.trim()) {
                error = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                error = "Email should be valid";
            }
        }

        if (name === "password") {
            if (!value) {
                error = "Password is required";
            } else if (value.length < 8 || value.length > 100) {
                error = "Password must be between 8 and 100 characters";
            } else if (!passwordRegex.test(value)) {
                error = "Password must contain uppercase, lowercase, number, and special character";
            }
        }

        if (name === "phoneNumber") {
            if (!value.trim()) {
                error = "Phone is required";
            } else if (!phoneRegex.test(value)) {
                error = "Phone must be 7-15 digits, may start with +, and contain only numbers";
            }
        }

        return error;
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        newErrors.firstName = validateField("firstName", form.firstName);
        newErrors.lastName = validateField("lastName", form.lastName);
        newErrors.address = validateField("address", form.address);
        newErrors.age = validateField("age", form.age);
        newErrors.email = validateField("email", form.email);
        newErrors.password = validateField("password", form.password);
        newErrors.phoneNumber = validateField("phoneNumber", form.phoneNumber);

        if (!form.roles || form.roles.length === 0) {
            newErrors.roles = "User must have at least one role";
        }

        Object.keys(newErrors).forEach((key) => {
            if (!newErrors[key]) delete newErrors[key];
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleRoleToggle = (role: string) => {
        setForm((prev) => ({
            ...prev,
            roles: prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [role],
        }));
        setErrors((prev) => ({
            ...prev,
            roles: "",
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Submit logic here
            alert("Registration successful!");
        }
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
                            Create Account
                        </Typography>
                    </Stack>
                    <Typography variant="subtitle1" color="gray" mb={4}>
                        Fill in your details to register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Stack spacing={3}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    fullWidth
                                    variant="filled"
                                    InputLabelProps={{ style: { color: "#bbb" } }}
                                    InputProps={{
                                        style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon style={{ color: "teal" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={form.firstName}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    inputProps={{ maxLength: 50 }}
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    fullWidth
                                    variant="filled"
                                    InputLabelProps={{ style: { color: "#bbb" } }}
                                    InputProps={{
                                        style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineIcon style={{ color: "teal" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={form.lastName}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    inputProps={{ maxLength: 50 }}
                                />
                            </Box>

                            <TextField
                                label="Address"
                                name="address"
                                fullWidth
                                variant="filled"
                                InputLabelProps={{ style: { color: "#bbb" } }}
                                InputProps={{
                                    style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <HomeOutlinedIcon style={{ color: "teal" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                value={form.address}
                                onChange={handleChange}
                                required
                                error={!!errors.address}
                                helperText={errors.address}
                                inputProps={{ maxLength: 255 }}
                            />

                            <Box sx={{ display: "flex", gap: 2 }}>
                                <TextField
                                    label="Age"
                                    name="age"
                                    type="number"
                                    fullWidth
                                    variant="filled"
                                    InputLabelProps={{ style: { color: "#bbb" } }}
                                    InputProps={{
                                        style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CakeOutlinedIcon style={{ color: "teal" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={form.age}
                                    onChange={handleChange}
                                    error={!!errors.age}
                                    helperText={errors.age}
                                    inputProps={{ min: 0, max: 150 }}
                                    required
                                />
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    fullWidth
                                    variant="filled"
                                    InputLabelProps={{ style: { color: "#bbb" } }}
                                    InputProps={{
                                        style: { backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#fff" },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneOutlinedIcon style={{ color: "teal" }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    inputProps={{ maxLength: 15 }}
                                />
                            </Box>

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
                                inputProps={{ maxLength: 100 }}
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
                                inputProps={{ minLength: 8, maxLength: 100 }}
                            />

                            <Box>
                                <Typography variant="subtitle1" gutterBottom fontWeight={500} color="#eee">
                                    Select Role
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                    {rolesList.map((role) => (
                                        <Chip
                                            key={role}
                                            label={role}
                                            color={form.roles[0] === role ? "primary" : "default"}
                                            variant={form.roles[0] === role ? "filled" : "outlined"}
                                            onClick={() => handleRoleToggle(role)}
                                            clickable
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: 16,
                                                px: 2,
                                                py: 1,
                                                borderRadius: 2,
                                                transition: "all 0.2s",
                                                boxShadow:
                                                    form.roles[0] === role
                                                        ? "0 2px 8px rgba(25, 118, 210, 0.15)"
                                                        : "none",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                },
                                                color: form.roles[0] === role ? "#fff" : "#ddd",
                                            }}
                                        />
                                    ))}
                                </Box>
                                {errors.roles && (
                                    <Typography color="error" variant="caption">
                                        {errors.roles}
                                    </Typography>
                                )}
                            </Box>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
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
                                Sign Up
                            </Button>
                            <Typography align="center" sx={{ mt: 2, color: "#ccc" }}>
                                Already have an account?{" "}
                                <Link
                                    component={RouterLink}
                                    to="/login"
                                    underline="hover"
                                    sx={{ color: "teal", fontWeight: 500 }}
                                >
                                    Log In
                                </Link>
                            </Typography>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}