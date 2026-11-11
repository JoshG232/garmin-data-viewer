import { createTheme } from '@mui/material/styles';

// 1. Extend the MUI types if you need custom palette keys
declare module '@mui/material/styles' {
    interface Palette {
        garmin: Palette['primary'];
    }

}

const theme = createTheme({
    palette: {
        primary: {
            main: '#212529',
        },
        background: {
            default: '#F8F9FA',
            paper: '#FFFFFF',
        },
        // Adding your specific green from the design
        success: {
            main: '#00FF41',
        },
    },
});

export default theme