import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";

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
                    component={RouterLink}
                    to="/"
                    variant="h6"
                    sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
                >
                    MedTrack
                </Typography>

                {!token ? (
                    <Box>
                        <Button component={RouterLink} to="/login" color="inherit">Sign In</Button>
                        <Button component={RouterLink} to="/register" color="inherit">Sign Up</Button>
                    </Box>
                ) : (
                    <Box>
                        <Button component={RouterLink} to="/dashboard" color="inherit">Dashboard</Button>
                        <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 1 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main' }} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;