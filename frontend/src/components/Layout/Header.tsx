// src/components/Layout/Header.tsx
import React from 'react';
import './Header.css';
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

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout();
        handleMenuClose();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    component={NavLink}
                    to="/"
                    variant="h6"
                    sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
                >
                    MedTrack
                </Typography>

                {/* wrap nav links in this container */}
                <Box className="nav-buttons">
                    {!token ? (
                        <>
                            <Button component={NavLink} to="/login" color="inherit">
                                Sign In
                            </Button>
                            <Button component={NavLink} to="/register" color="inherit">
                                Sign Up
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={NavLink} to="/dashboard" color="inherit">
                                Dashboard
                            </Button>
                            <Button component={NavLink} to="/drugs" color="inherit">
                                Drugs
                            </Button>
                            <IconButton color="inherit" onClick={handleMenuOpen} className="avatar-button">
                                <Avatar sx={{ bgcolor: 'secondary.main' }} />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem
                                    component={NavLink}
                                    to="/profile"
                                    onClick={handleMenuClose}
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