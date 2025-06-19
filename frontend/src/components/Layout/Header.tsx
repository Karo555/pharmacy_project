import React from 'react';
import './Header.css';
import '../../styles/globals.css';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/login');
    };

    return (
        <AppBar position="static" className="shadow-md" sx={{ bgcolor: 'var(--color-primary)' }}>
            <Toolbar>
                <Typography
                    component={NavLink}
                    to="/"
                    variant="h6"
                    className="nav-link font-bold text-white"
                    sx={{ flexGrow: 1 }}
                >
                    MedTrack
                </Typography>

                <Box className="flex items-center">
                    {!token ? (
                        <>
                            <Button component={NavLink} to="/login" color="inherit" className="nav-link text-white">
                                Sign In
                            </Button>
                            <Button
                                component={NavLink}
                                to="/register"
                                color="inherit"
                                className="nav-link btn btn-outline rounded-full ml-2 text-white"
                                sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                            >
                                Sign Up
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={NavLink} to="/dashboard" color="inherit" className="nav-link text-white">
                                Dashboard
                            </Button>

                            <Button component={NavLink} to="/drugs" color="inherit" className="nav-link text-white">
                                Drugs
                            </Button>

                            {/* NEW: Prescriptions link */}
                            <Button
                                component={NavLink}
                                to="/prescriptions"
                                color="inherit"
                                className="nav-link text-white"
                            >
                                Prescriptions
                            </Button>

                            <IconButton color="inherit" onClick={handleMenuOpen} className="avatar-button">
                                <Avatar sx={{ bgcolor: 'secondary.main' }} />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem
                                    component={NavLink}
                                    to="/profile"
                                    onClick={handleMenuClose}
                                    className="nav-link"
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;