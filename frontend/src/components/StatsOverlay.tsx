import React from 'react';
import { Box, Typography } from '@mui/material';

interface StatItemProps {
    label: string;
    value: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
    <Box sx={{ textAlign: 'right', mb: 1 }}>
        <Typography
            variant="body2"
            sx={{
                color: '#212529',
                fontFamily: '"Google Sans Code", monospace',
                fontSize: '0.85rem',
            }}
        >
            {label}
        </Typography>
        <Typography
            variant="h6"
            sx={{
                fontWeight: 600,
                color: '#212529',
                fontFamily: '"Google Sans Code", monospace',
            }}
        >
            {value}
        </Typography>
    </Box>
);

interface StatsOverlayProps {
    stats: StatItem[];
}

const StatsOverlay: React.FC<StatsOverlayProps> = ({ stats }) => (
    <Box
        sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
        }}
    >
        {stats.map((stat, index) => (
            <StatItem key={index} label={stat.label} value={stat.value} />
        ))}
    </Box>
);

export default StatsOverlay;
