import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import type { Activity } from '../Types/Activity';
import DashboardCard from '../components/DashboardCard';
import StatsOverlay from '../components/StatsOverlay';
import Heatmap from '../components/Heatmap';
import { getActivities } from '../api/activity';

const Home: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
            const activitiesData = await getActivities();
            setActivities(activitiesData);
            console.log("Activities loaded:", activitiesData.length);
            } catch (err) {
                console.error("Error loading data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const totalDistance = activities.reduce((sum, a) => sum + (a.distance ?? 0), 0);
    const totalTime = activities.reduce((sum, a) => sum + (a.duration ?? 0), 0);
    const totalAscent = activities.reduce((sum, a) => sum + (a.elevationGain ?? 0), 0);

    const formatTime = (ms: number): string => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
    };

    const formatDistance = (meters: number): string => {
        if (meters >= 1000) return `${(meters / 1000).toFixed(2)} km`;
        return `${meters.toFixed(0)} m`;
    };

    return (
        <Box sx={{ p: 4, minHeight: '100vh' }}>
            {/* Page Header */}
            <Box
                sx={{
                    bgcolor: '#3E5941',
                    borderRadius: 2,
                    p: 3,
                    mb: 3,
                    color: '#fff',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontFamily: '"Google Sans Code", monospace',
                    }}
                >
                    Home
                </Typography>
            </Box>

            {/* Loading & Error States */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <Typography sx={{ fontFamily: '"Google Sans Code", monospace' }}>Loading data...</Typography>
                </Box>
            )}
            {error && (
                <Box
                    sx={{
                        bgcolor: '#FFF3CD',
                        border: '1px solid #FFE69C',
                        borderRadius: 2,
                        p: 3,
                        mb: 4,
                        fontFamily: '"Google Sans Code", monospace',
                        color: '#856404',
                    }}
                >
                    {error}
                </Box>
            )}

            {/* Main Content */}
            {!loading && !error && (
                <Grid container spacing={2}>
                    <Grid size={8}>
                        {/* Chart Card with Stats Overlay */}
                        <DashboardCard>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 2,
                                    fontFamily: '"Google Sans Code", monospace',
                                    color: '#212529',
                                }}
                            >
                                Distance Over Time
                            </Typography>
                            <Box
                                sx={{
                                    height: 300,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    borderRadius: 2,
                                }}
                            >
                                {/* Add the line chart into here */}
                                <Typography sx={{ fontFamily: '"Google Sans Code", monospace', color: '#6c757d' }}>
                                    Distance chart will be rendered here
                                </Typography>
                            </Box>
                        </DashboardCard>
                    </Grid>
                    <Grid size={4}>
                        {/* Heatmap Card */}
                        <Box sx={{}}>
                            <DashboardCard>
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 2,
                                        fontFamily: '"Google Sans Code", monospace',
                                        color: '#212529',
                                    }}
                                >
                                    Activity Heatmap
                                </Typography>
                                <Heatmap sx={{ mt: 1 }} />
                            </DashboardCard>
                        </Box>
                    </Grid>
                </Grid>
            )} 
        </Box>    
    )   
};


export default Home;