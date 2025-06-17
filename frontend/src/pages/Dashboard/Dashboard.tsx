import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    Card,
    CardContent,
    CardActions,
    Divider,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Badge,
    Stack,
    Tooltip,
    LinearProgress,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Tab,
    Tabs,
    Grid,
    CircularProgress,
} from '@mui/material';
import {
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    MedicalServices as MedicalServicesIcon,
    LocalPharmacy as LocalPharmacyIcon,
    CalendarMonth as CalendarMonthIcon,
    Person as PersonIcon,
    ShoppingCart as ShoppingCartIcon,
    NotificationsActive as NotificationsActiveIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { getProfile } from '../../api/auth';
import { UserProfileResponseDTO } from '../../types/auth';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`dashboard-tabpanel-${index}`}
            aria-labelledby={`dashboard-tab-${index}`}
            {...other}
            style={{ paddingTop: 20 }}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [tabValue, setTabValue] = useState(0);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
    const [userProfile, setUserProfile] = useState<UserProfileResponseDTO | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
        getProfile()
            .then(data => setUserProfile(data))
            .catch(() => {})
            .finally(() => setLoadingProfile(false));
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const handleNotificationMenuOpen = (e: React.MouseEvent<HTMLElement>) => setNotificationAnchorEl(e.currentTarget);
    const handleNotificationMenuClose = () => setNotificationAnchorEl(null);
    const handleProfileMenuOpen = (e: React.MouseEvent<HTMLElement>) => setProfileAnchorEl(e.currentTarget);
    const handleProfileMenuClose = () => setProfileAnchorEl(null);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'success';
            case 'expired': return 'error';
            case 'processing': return 'warning';
            case 'shipped': return 'info';
            default: return 'default';
        }
    };

    // Show loading while profile is fetched
    if (loadingProfile) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Box sx={{
            background: theme.palette.mode === 'light'
                ? 'linear-gradient(to bottom, rgba(25, 118, 210, 0.05), rgba(255, 255, 255, 1) 200px)'
                : 'linear-gradient(to bottom, rgba(0, 30, 60, 0.1), rgba(15, 15, 15, 1) 200px)',
            minHeight: '100vh',
            pt: 2,
            pb: 6,
        }}>
            {/* AppBar */}
            <Paper elevation={1} sx={{ borderRadius: 0, mb: 3, position: 'relative', zIndex: 10 }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocalPharmacyIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
                            <Typography variant="h6" component="div" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                                MedTrack
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Notifications">
                                <IconButton size="large" onClick={handleNotificationMenuOpen}>
                                    <Badge badgeContent={3} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Profile">
                                <IconButton size="large" onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                        <PersonIcon />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Container>
            </Paper>

            {/* Notification Menu */}
            {/* ... unchanged ... */}

            {/* Profile Menu */}
            <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={handleProfileMenuClose} /* ... */>
                <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
                    <ListItemIcon><PersonIcon fontSize="small"/></ListItemIcon>
                    <ListItemText primary="Profile"/>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small"/></ListItemIcon>
                    <ListItemText primary="Logout"/>
                </MenuItem>
            </Menu>

            <Container maxWidth="lg">
                {/* Welcome */}
                <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Welcome, {userProfile?.email.split('@')[0]}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {new Date().toLocaleDateString(undefined, { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
                        </Typography>
                    </Box>
                    <Button component={RouterLink} to="/drugs" variant="contained" startIcon={<AddIcon />} sx={{ mt: { xs:2, sm:0 } }}>
                        Browse Drugs
                    </Button>
                </Box>

                {/* Quick Stats - static counts from profile or placeholder */}
                {/* Tabs and content remain unchanged, still using mock data */}
            </Container>
        </Box>
    );
};

export default Dashboard;