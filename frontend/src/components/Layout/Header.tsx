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
                px: { xs: 2, sm: 2.5 },
                py: 0.5,
                fontSize: { xs: '16px', sm: '16px' }, // Ensuring minimum 16px font size
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                height: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.25px'
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
                px: { xs: 2, sm: 2.5 },
                py: 0.5,
                fontSize: { xs: '16px', sm: '16px' }, // Ensuring minimum 16px font size
                whiteSpace: 'nowrap',
                minWidth: 'auto',
                height: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '0.25px'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DescriptionIcon sx={{ fontSize: '1.1rem' }} />
                <span>{isMobile ? 'Upload' : 'Upload Rx'}</span>
            </Box>
        </Button>
    );

    // Menu content
    const menuContent = (
        <Box
            sx={{ width: { xs: '85vw', sm: 320 }, maxWidth: '100vw' }}
            role="presentation"
            className="menu-content"
        >
            <List>
                <ListItem sx={{ my: 1 }}>
                    <Typography variant="h6" className="font-bold" sx={{ fontSize: '18px' }}>
                        MedTrack
                    </Typography>
                </ListItem>

                <ListItem
                    button
                    onClick={() => handleNavigation('/')}
                    sx={{ py: 1.5 }}
                >
                    <ListItemIcon><HomeIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                    <ListItemText
                        primary="Home"
                        primaryTypographyProps={{ fontSize: '16px' }}
                    />
                </ListItem>

                {!token ? (
                    <>
                        <ListItem
                            button
                            onClick={() => handleNavigation('/login')}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon><LoginIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                            <ListItemText
                                primary="Sign In"
                                primaryTypographyProps={{ fontSize: '16px' }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleNavigation('/register')}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon><PersonAddIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                            <ListItemText
                                primary="Sign Up"
                                primaryTypographyProps={{ fontSize: '16px' }}
                            />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem
                            button
                            onClick={() => handleNavigation('/dashboard')}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon><DashboardIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                            <ListItemText
                                primary="Dashboard"
                                primaryTypographyProps={{ fontSize: '16px' }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleNavigation('/drugs')}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon><MedicationIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                            <ListItemText
                                primary="Drugs"
                                primaryTypographyProps={{ fontSize: '16px' }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleNavigation('/prescriptions')}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon><DescriptionIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                            <ListItemText
                                primary="Prescriptions"
                                primaryTypographyProps={{ fontSize: '16px' }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => handleNavigation('/profile')}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon><AccountCircleIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                            <ListItemText
                                primary="Profile"
                                primaryTypographyProps={{ fontSize: '16px' }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            onClick={handleLogout}
                            sx={{ py: 1.5 }}
                        >
                            <ListItemIcon><LogoutIcon sx={{ fontSize: '22px' }} /></ListItemIcon>
                            <ListItemText
                                primary="Logout"
                                primaryTypographyProps={{ fontSize: '16px' }}
                            />
                        </ListItem>
                    </>
                )}

                <ListItem sx={{ py: 1.5 }}>
                    <ListItemText
                        primary="Theme"
                        primaryTypographyProps={{ fontSize: '16px' }}
                    />
                    <ThemeToggle />
                </ListItem>
            </List>
        </Box>
    );

    // Define specific styles for different breakpoints
    const responsiveHeaderHeight = {
        xs: scrolled ? '56px' : '64px',
        sm: scrolled ? '60px' : '64px',
        md: scrolled ? '60px' : '64px'
    };

    const logoFontSize = {
        xs: scrolled ? '16px' : '18px',
        sm: scrolled ? '18px' : '20px',
        md: scrolled ? '20px' : '22px'
    };

    return (
        <AppBar
            position="fixed"
            className={`transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
            sx={{
                bgcolor: scrolled ? 'rgba(10, 25, 41, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(8px)' : 'none',
                height: responsiveHeaderHeight,
                transition: 'all 0.3s ease',
                zIndex: theme.zIndex.drawer + 1,
                boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
            }}
            elevation={0}
        >
            <Toolbar
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    justifyContent: 'space-between',
                    minHeight: responsiveHeaderHeight,
                    px: { xs: 1, sm: 2 },
                    py: 0,
                    gap: { xs: 1, sm: 2 }
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
                                    mr: { xs: 0.5, sm: 1 },
                                    width: '44px',
                                    height: '44px'
                                }}
                                aria-label="back"
                            >
                                <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Typography
                        component={NavLink}
                        to="/"
                        variant={scrolled ? "subtitle1" : "h6"}
                        className="nav-link font-bold text-white"
                        sx={{
                            fontSize: logoFontSize,
                            lineHeight: 1.2,
                            transition: 'font-size 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            height: '44px',
                            px: { xs: 0.5, sm: 1 },
                            letterSpacing: '0.5px'
                        }}
                    >
                        MedTrack
                    </Typography>
                </Box>

                {/* Right section: Primary CTA & Menu */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                    {primaryCTA}

                    <Tooltip title="Menu">
                        <IconButton
                            color="inherit"
                            aria-label="open menu"
                            onClick={toggleMenu}
                            className="menu-button"
                            edge="end"
                            sx={{
                                width: '44px',
                                height: '44px',
                                ml: { xs: 0.5, sm: 0.5 }
                            }}
                        >
                            <MenuIcon fontSize={isMobile ? "medium" : "medium"} />
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
