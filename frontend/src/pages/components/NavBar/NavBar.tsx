import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

const NavBar: React.FC = () => (
    <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PharmaPlus
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">
                Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/products">
                Products
            </Button>
        </Toolbar>
    </AppBar>
);

export default NavBar;