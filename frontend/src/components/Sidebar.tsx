import React from 'react';
import { Box, Typography, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Activities', path: '/activities' },
    { label: 'About', path: '/about' },
];

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <Box
            sx={{
                width: 240,
                height: '100vh',
                bgcolor: '#E0DDD4',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                py: 3,
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1000,
            }}
        >
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        px: 2,
                        mb: 4,
                        fontFamily: '"Google Sans Code", monospace',
                        fontSize: '1.1rem',
                        color: '#212529',
                    }}
                >
                    Garmin Data Viewer
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                <List>
                    {navItems.map((item) => (
                        <ListItemButton
                            key={item.path}
                            component={Link}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2,
                                borderRadius: 1,
                                mx: 1,
                                mb: 0.5,
                                bgcolor: location.pathname === item.path ? 'rgba(0,0,0,0.08)' : 'transparent',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.05)',
                                },
                                fontFamily: '"Google Sans Code", monospace',
                                fontSize: '0.95rem',
                                color: '#212529',
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    sx: {
                                        fontWeight: location.pathname === item.path ? 700 : 400,
                                    },
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Sidebar;
