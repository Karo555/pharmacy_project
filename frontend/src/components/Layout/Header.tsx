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
    Tooltip,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useThemeMode from '../../hooks/useThemeMode';
import ThemeToggle from '../ui/ThemeToggle';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
    const { token, logout } = useAuth();
    const { isDarkMode } = useThemeMode();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = () => {
        logout();
        handleMenuClose();
        setMobileMenuOpen(false);
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    // Mobile menu drawer content
    const mobileMenuContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu"
        >
            <List>
                <ListItem>
                    <Typography variant="h6" className="font-bold">
                        MedTrack
                    </Typography>
                </ListItem>

                {!token ? (
                    <>
                        <ListItem button onClick={() => handleNavigation('/login')}>
                            <ListItemText primary="Sign In" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/register')}>
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button onClick={() => handleNavigation('/dashboard')}>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/drugs')}>
                            <ListItemText primary="Drugs" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/prescriptions')}>
                            <ListItemText primary="Prescriptions" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/profile')}>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                )}

                <ListItem>
                    <ThemeToggle />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="static" className="shadow-md" sx={{ bgcolor: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>
            <Toolbar sx={{ position: 'relative', zIndex: 1 }}>
                <Typography
                    component={NavLink}
                    to="/"
                    variant="h6"
                    className="nav-link font-bold text-white"
                    sx={{ flexGrow: 1 }}
                >
                    MedTrack
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open menu"
                            edge="end"
                            onClick={toggleMobileMenu}
                            className="hamburger-button"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={mobileMenuOpen}
                            onClose={() => setMobileMenuOpen(false)}
                        >
                            {mobileMenuContent}
                        </Drawer>
                    </>
                ) : (
                    <Box className="flex items-center">
                        {/* Theme toggle button */}
                        <ThemeToggle />

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
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;