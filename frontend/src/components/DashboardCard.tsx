import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface DashboardCardProps {
    title?: string;
    children: React.ReactNode;
    sx?: Record<string, unknown>;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, sx }) => {
    return (
        <Paper
            elevation={2}
            sx={{
                bgcolor: '#E0DDD4',
                borderRadius: 2,
                p: 3,
                position: 'relative',
                ...sx,
            }}
        >
            {title && (
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        fontFamily: '"Google Sans Code", monospace',
                        color: '#212529',
                    }}
                >
                    {title}
                </Typography>
            )}
            <Box sx={{ position: 'relative', height: '100%' }}>
                {children}
            </Box>
        </Paper>
    );
};

export default DashboardCard;
