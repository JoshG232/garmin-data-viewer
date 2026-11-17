import React from 'react';
import { Box } from '@mui/material';

interface HeatmapProps {
    data?: number[][];
    sx?: Record<string, unknown>;
}

const Heatmap: React.FC<HeatmapProps> = ({ data, sx }) => {
    // Default data if none provided - 8 rows x 16 columns with varying green intensities
    const defaultData = data || Array.from({ length: 8 }, () =>
        Array.from({ length: 16 }, () => Math.random())
    );

    const getColor = (value: number): string => {
        // Map values to green shades from light to dark
        if (value < 0.25) return '#C8E6C9';
        if (value < 0.5) return '#81C784';
        if (value < 0.75) return '#4CAF50';
        return '#2E7D32';
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${defaultData[0]?.length || 16}, 1fr)`,
                gap: 2,
                ...sx,
            }}
        >
            {/* {defaultData.map((row, rowIndex) =>
                row.map((value, colIndex) => (
                    <Box
                        key={`${rowIndex}-${colIndex}`}
                        sx={{
                            width: 24,
                            height: 24,
                            bgcolor: getColor(value),
                            borderRadius: 0.5,
                        }}
                    />
                ))
            )} */}
        </Box>
    );
};

export default Heatmap;
