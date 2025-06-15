import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Box,
    Grid,
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
    History as HistoryIcon,
    AccountCircle as AccountCircleIcon,
    Dashboard as DashboardIcon,
    NotificationsActive as NotificationsActiveIcon,
    KeyboardArrowRight as KeyboardArrowRightIcon,
    MoreVert as MoreVertIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`dashboard-tabpanel-${index}`}
            aria-labelledby={`dashboard-tab-${index}`}
            {...other}
            style={{ paddingTop: 20 }}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}

// Mock data for prescriptions
const prescriptions = [
    {
        id: 1,
        name: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Every 8 hours',
        status: 'Active',
        refillsRemaining: 2,
        lastRefill: '2025-05-20',
        nextRefill: '2025-06-20',
    },
    {
        id: 2,
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        status: 'Active',
        refillsRemaining: 5,
        lastRefill: '2025-05-15',
        nextRefill: '2025-06-15',
    },
    {
        id: 3,
        name: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily before bed',
        status: 'Expired',
        refillsRemaining: 0,
        lastRefill: '2025-03-10',
        nextRefill: null,
    },
];

// Mock data for upcoming orders
const upcomingOrders = [
    {
        id: 1,
        medications: ['Amoxicillin 500mg', 'Vitamin D 1000IU'],
        status: 'Processing',
        deliveryDate: '2025-06-17',
    },
    {
        id: 2,
        medications: ['Lisinopril 10mg'],
        status: 'Shipped',
        deliveryDate: '2025-06-16',
    },
];

// Mock data for reminders
const reminders = [
    {
        id: 1,
        medication: 'Amoxicillin',
        time: '8:00 AM, 4:00 PM, 12:00 AM',
        nextDose: '4:00 PM Today',
    },
    {
        id: 2,
        medication: 'Lisinopril',
        time: '9:00 AM',
        nextDose: '9:00 AM Tomorrow',
    },
];

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [tabValue, setTabValue] = useState(0);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationMenuClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'active':
                return 'success';
            case 'expired':
                return 'error';
            case 'processing':
                return 'warning';
            case 'shipped':
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <Box sx={{
            background: theme.palette.mode === 'light'
                ? 'linear-gradient(to bottom, rgba(25, 118, 210, 0.05), rgba(255, 255, 255, 1) 200px)'
                : 'linear-gradient(to bottom, rgba(0, 30, 60, 0.1), rgba(15, 15, 15, 1) 200px)',
            minHeight: '100vh',
            pt: 2,
            pb: 6,
        }}>
            {/* Top AppBar */}
            <Paper
                elevation={1}
                sx={{
                    borderRadius: 0,
                    mb: 3,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1.5,
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocalPharmacyIcon
                                color="primary"
                                sx={{ fontSize: 32, mr: 1 }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 600,
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                MedTrack
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Notifications">
                                <IconButton
                                    size="large"
                                    onClick={handleNotificationMenuOpen}
                                >
                                    <Badge badgeContent={3} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Profile">
                                <IconButton
                                    size="large"
                                    onClick={handleProfileMenuOpen}
                                    sx={{ ml: 1 }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            bgcolor: 'primary.main',
                                        }}
                                    >
                                        <PersonIcon />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Container>
            </Paper>

            {/* Notification Menu */}
            <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        width: 320,
                        maxWidth: '100%',
                        mt: 1.5,
                        borderRadius: 2,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, pb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                        Notifications
                    </Typography>
                </Box>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <NotificationsActiveIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Prescription Refill Ready"
                        secondary="Your Amoxicillin prescription is ready for pickup"
                    />
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <ShoppingCartIcon fontSize="small" color="info" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Order Shipped"
                        secondary="Your order #1234 has been shipped"
                    />
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <MedicalServicesIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Medication Alert"
                        secondary="You missed your evening dose of Lisinopril"
                    />
                </MenuItem>
                <Divider />
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                    <Button size="small">View All Notifications</Button>
                </Box>
            </Menu>

            {/* Profile Menu */}
            <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                    elevation: 3,
                    sx: {
                        width: 200,
                        maxWidth: '100%',
                        mt: 1.5,
                        borderRadius: 2,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => navigate('/profile')}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </MenuItem>
                <MenuItem onClick={() => navigate('/settings')}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </MenuItem>
            </Menu>

            <Container maxWidth="lg">
                {/* Welcome Section */}
                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mb: 0.5,
                            }}
                        >
                            Welcome, John
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            mt: { xs: 2, sm: 0 },
                            borderRadius: 28,
                            px: 3,
                            py: 1,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        New Prescription
                    </Button>
                </Box>

                {/* Quick Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'rgba(25, 118, 210, 0.1)',
                                    color: 'primary.main',
                                    mb: 2,
                                }}
                            >
                                <MedicalServicesIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight={700}>
                                3
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Active Prescriptions
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                                    color: 'success.main',
                                    mb: 2,
                                }}
                            >
                                <ShoppingCartIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight={700}>
                                2
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Upcoming Orders
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'rgba(255, 152, 0, 0.1)',
                                    color: 'warning.main',
                                    mb: 2,
                                }}
                            >
                                <NotificationsIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight={700}>
                                2
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Medication Reminders
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                height: '100%',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: 'rgba(123, 31, 162, 0.1)',
                                    color: 'secondary.main',
                                    mb: 2,
                                }}
                            >
                                <CalendarMonthIcon />
                            </Avatar>
                            <Typography variant="h5" fontWeight={700}>
                                1
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Upcoming Appointments
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Main Content */}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="dashboard tabs"
                            variant={isSmallScreen ? "scrollable" : "fullWidth"}
                            scrollButtons={isSmallScreen ? "auto" : false}
                            allowScrollButtonsMobile
                            sx={{
                                '& .MuiTab-root': {
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                },
                            }}
                        >
                            <Tab
                                label="Prescriptions"
                                icon={<MedicalServicesIcon />}
                                iconPosition="start"
                            />
                            <Tab
                                label="Orders"
                                icon={<ShoppingCartIcon />}
                                iconPosition="start"
                            />
                            <Tab
                                label="Reminders"
                                icon={<NotificationsIcon />}
                                iconPosition="start"
                            />
                        </Tabs>
                    </Box>

                    {/* Prescriptions Tab */}
                    <TabPanel value={tabValue} index={0}>
                        <Grid container spacing={3}>
                            {prescriptions.map((prescription) => (
                                <Grid item xs={12} md={6} key={prescription.id}>
                                    <Card
                                        elevation={2}
                                        sx={{
                                            borderRadius: 3,
                                            height: '100%',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                <Typography variant="h6" fontWeight={600}>
                                                    {prescription.name}
                                                </Typography>
                                                <Chip
                                                    label={prescription.status}
                                                    color={getStatusColor(prescription.status) as any}
                                                    size="small"
                                                />
                                            </Box>

                                            <Typography variant="body2" color="text.secondary" paragraph>
                                                {prescription.dosage} - {prescription.frequency}
                                            </Typography>

                                            {prescription.status === 'Active' && (
                                                <>
                                                    <Box sx={{ mt: 2, mb: 1 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Refills remaining
                                                            </Typography>
                                                            <Typography variant="body2" fontWeight={500}>
                                                                {prescription.refillsRemaining}
                                                            </Typography>
                                                        </Box>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={(prescription.refillsRemaining / 5) * 100}
                                                            sx={{
                                                                height: 8,
                                                                borderRadius: 4,
                                                                bgcolor: 'rgba(0,0,0,0.05)',
                                                            }}
                                                        />
                                                    </Box>

                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Next refill:
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {prescription.nextRefill ? new Date(prescription.nextRefill).toLocaleDateString() : 'N/A'}
                                                        </Typography>
                                                    </Box>
                                                </>
                                            )}
                                        </CardContent>

                                        <CardActions sx={{ px: 2, pb: 2 }}>
                                            <Button
                                                size="small"
                                                variant={prescription.status === 'Active' ? "contained" : "outlined"}
                                                disabled={prescription.status !== 'Active' || prescription.refillsRemaining === 0}
                                                sx={{
                                                    borderRadius: 28,
                                                    px: 2,
                                                }}
                                            >
                                                Request Refill
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{ ml: 'auto' }}
                                                endIcon={<KeyboardArrowRightIcon />}
                                            >
                                                Details
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>

                    {/* Orders Tab */}
                    <TabPanel value={tabValue} index={1}>
                        <Grid container spacing={3}>
                            {upcomingOrders.map((order) => (
                                <Grid item xs={12} md={6} key={order.id}>
                                    <Card
                                        elevation={2}
                                        sx={{
                                            borderRadius: 3,
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                <Typography variant="h6" fontWeight={600}>
                                                    Order #{order.id}
                                                </Typography>
                                                <Chip
                                                    label={order.status}
                                                    color={getStatusColor(order.status) as any}
                                                    size="small"
                                                />
                                            </Box>

                                            <Typography variant="subtitle2" gutterBottom>
                                                Medications:
                                            </Typography>

                                            <List dense disablePadding>
                                                {order.medications.map((med, index) => (
                                                    <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                                            <LocalPharmacyIcon color="primary" fontSize="small" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={med} />
                                                    </ListItem>
                                                ))}
                                            </List>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Expected delivery:
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {new Date(order.deliveryDate).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        </CardContent>

                                        <CardActions sx={{ px: 2, pb: 2 }}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={{
                                                    borderRadius: 28,
                                                    px: 2,
                                                }}
                                            >
                                                Track Order
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{ ml: 'auto' }}
                                                endIcon={<KeyboardArrowRightIcon />}
                                            >
                                                Details
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>

                    {/* Reminders Tab */}
                    <TabPanel value={tabValue} index={2}>
                        <Grid container spacing={3}>
                            {reminders.map((reminder) => (
                                <Grid item xs={12} md={6} key={reminder.id}>
                                    <Card
                                        elevation={2}
                                        sx={{
                                            borderRadius: 3,
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Avatar
                                                    sx={{
                                                        bgcolor: 'rgba(255, 152, 0, 0.1)',
                                                        color: 'warning.main',
                                                        mr: 2,
                                                    }}
                                                >
                                                    <NotificationsActiveIcon />
                                                </Avatar>
                                                <Typography variant="h6" fontWeight={600}>
                                                    {reminder.medication}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Schedule:
                                                </Typography>
                                                <Typography variant="body2" fontWeight={500}>
                                                    {reminder.time}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Next dose:
                                                </Typography>
                                                <Typography variant="body2" fontWeight={600} color="warning.main">
                                                    {reminder.nextDose}
                                                </Typography>
                                            </Box>
                                        </CardContent>

                                        <CardActions sx={{ px: 2, pb: 2 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: 28,
                                                    px: 2,
                                                }}
                                            >
                                                Take Now
                                            </Button>
                                            <Button
                                                size="small"
                                                sx={{ ml: 'auto' }}
                                            >
                                                Adjust Reminder
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;