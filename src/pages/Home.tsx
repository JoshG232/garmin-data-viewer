import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, AppBar, Toolbar, Button, styled } from '@mui/material';
import type { Activity } from '../Types/Activity';
import * as Papa from 'papaparse';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const Home: React.FC = () => {

    const [, setFileResults] = useState<Activity[]>([])

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files?.[0])
        const file = event.target.files?.[0];
        if (!file) return

        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<Activity>) => {
                const data = results.data as Activity[];
                console.log("Rows: ", results.data)
                setFileResults(data)

            },
            error: (error: Error) => console.error(error)
        })
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                            Garmin Data Viewer
                        </Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                accept='.csv'
                                type="file"
                                onChange={(event) => handleFileUpload(event)}
                                multiple
                            />
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", direction: "column" }}>
                    <Box sx={{ py: 4, width: "90%" }}>
                        <Grid container spacing={2}>
                            {/* Use 'xs' for mobile and 'md/lg' for desktop layouts */}
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ p: 1, height: 450, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Activity Table</Typography>
                                </Paper>
                            </Grid>

                            <Grid size={12}>
                                <Paper elevation={0} sx={{ p: 3, height: 250, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Heart Rate Over Time</Typography>
                                </Paper>
                            </Grid>

                            {/* Rest of your grid items... */}
                        </Grid>
                    </Box>
                </Box>


            </Box>
        </>
    );
};


export default Home;