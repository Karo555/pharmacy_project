import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#6750A4' },
        secondary: { main: '#625B71' },
        background: { default: '#FFFBFE', paper: '#FFFFFF' },
        error: { main: '#B3261E' },
        text: { primary: '#1C1B1F', secondary: '#49454F' },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: 'Roboto, Arial, sans-serif' },
});

export default theme;