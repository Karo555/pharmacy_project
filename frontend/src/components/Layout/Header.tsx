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
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    useMediaQuery,
    useTheme,
    Tooltip,
} from '@mui/material';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useThemeMode from '../../hooks/useThemeMode';
import ThemeToggle from '../ui/ThemeToggle';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';

const Header: React.FC = () => {
    const { token, logout } = useAuth();
    const { isDarkMode } = useThemeMode();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [scrolled, setScrolled] = React.useState(false);

    // Detect scroll to change header appearance
    React.useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setMenuOpen(false);
    };

    // Check if we're not on the home page to show back button
    const showBackButton = location.pathname !== '/';

    // Determine primary CTA based on authentication status
    const primaryCTA = !token ? (
        <Button
            component={NavLink}
            to="/register"
            variant="contained"
            color="secondary"
            className="rounded-full"
            sx={{
                px: 2.5,
                py: 0.5,
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                height: '32px'
            }}
        >
            Sign Up
        </Button>
    ) : (
        <Button
            component={NavLink}
            to="/prescriptions/upload"
            variant="contained"
            color="secondary"
            className="rounded-full"
            sx={{
                px: 2.5,
                py: 0.5,
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                height: '32px'
            }}
        >
            Upload Rx
        </Button>
    );

    // Menu content
    const menuContent = (
        <Box
            sx={{ width: 280 }}
            role="presentation"
            className="menu-content"
        >
            <List>
                <ListItem>
                    <Typography variant="h6" className="font-bold">
                        MedTrack
                    </Typography>
                </ListItem>

                <ListItem button onClick={() => handleNavigation('/')}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                {!token ? (
                    <>
                        <ListItem button onClick={() => handleNavigation('/login')}>
                            <ListItemIcon><LoginIcon /></ListItemIcon>
                            <ListItemText primary="Sign In" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/register')}>
                            <ListItemIcon><PersonAddIcon /></ListItemIcon>
                            <ListItemText primary="Sign Up" />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button onClick={() => handleNavigation('/dashboard')}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/drugs')}>
                            <ListItemIcon><MedicationIcon /></ListItemIcon>
                            <ListItemText primary="Drugs" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/prescriptions')}>
                            <ListItemIcon><DescriptionIcon /></ListItemIcon>
                            <ListItemText primary="Prescriptions" />
                        </ListItem>
                        <ListItem button onClick={() => handleNavigation('/profile')}>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                )}

                <ListItem>
                    <ListItemText primary="Theme" />
                    <ThemeToggle />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar
            position="fixed"
            className={`shadow-md transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
            sx={{
                bgcolor: scrolled ? 'var(--color-primary-dark, #0a1929)' : 'var(--color-primary)',
                height: scrolled ? '50px' : '60px',
                transition: 'all 0.3s ease',
                zIndex: theme.zIndex.drawer + 1,
            }}
            elevation={scrolled ? 4 : 2}
        >
            <Toolbar
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    justifyContent: 'space-between',
                    minHeight: scrolled ? '50px !important' : '60px !important',
                    px: { xs: 1.5, sm: 2 },
                    py: 0
                }}
                variant="dense"
            >
                {/* Left section: Back button & Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {showBackButton && (
                        <Tooltip title="Back">
                            <IconButton
                                color="inherit"
                                onClick={() => navigate(-1)}
                                sx={{
                                    mr: 0.5,
                                    width: '32px',
                                    height: '32px'
                                }}
                                aria-label="back"
                                size="small"
                            >
                                <ArrowBackIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Typography
                        component={NavLink}
                        to="/"
                        variant={scrolled ? "subtitle1" : "h6"}
                        className="nav-link font-bold text-white"
                        sx={{
                            fontSize: scrolled ? '1.1rem' : '1.25rem',
                            transition: 'font-size 0.3s ease'
                        }}
                    >
                        MedTrack
                    </Typography>
                </Box>

                {/* Right section: Primary CTA & Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {primaryCTA}

                    <Tooltip title="Menu">
                        <IconButton
                            color="inherit"
                            aria-label="open menu"
                            onClick={toggleMenu}
                            className="menu-button"
                            edge="end"
                            size="small"
                            sx={{
                                width: '32px',
                                height: '32px',
                                ml: 0.5
                            }}
                        >
                            <MenuIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Menu drawer - same for both mobile and desktop */}
                <Drawer
                    anchor="right"
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                >
                    {menuContent}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;

