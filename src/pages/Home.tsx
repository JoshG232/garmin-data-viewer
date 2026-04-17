import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, AppBar, Toolbar, Button, styled } from '@mui/material';
import { Decoder, Stream } from '@garmin/fitsdk';
import * as JSZip from 'jszip';
import IndexLineChart from '../components/LineChart';
import type { FitMessages } from '../Types/Activity';




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

    const [allActivities, setAllActivities] = useState<FitMessages[]>([]);
    const [activityLoads, setActivityLoads] = useState<number[]>([]);

    const handleSingleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files?.[0])
        const file = event.target.files?.[0];
        if (!file) return

        const arrayBuffer = await file.arrayBuffer();

        const uint8Array = new Uint8Array(arrayBuffer);
        const stream = Stream.fromArrayBuffer(uint8Array.buffer);

        if (!Decoder.isFIT(stream)) {
            throw new Error("Invalid FIT file");
        }

        const decoder = new Decoder(stream);
        const { messages, errors } = decoder.read({
            applyScaleAndOffset: true,
            convertDateTimesToDates: true,
            convertTypesToStrings: true,
        });

        console.log("Message type: ", typeof (messages))
        console.log(messages);
        console.log(errors);


    }

    const handleZIPFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.files?.[0])
        const file = event.target.files?.[0];
        if (!file) return

        const zip = await JSZip.loadAsync(file);

        const paths = Object.keys(zip.files).filter(p => !zip.files[p].dir)

        const activityFiles: object[] = []

        for (const path of paths) {
            const innerArrayBuffer = await zip.files[path].async('arraybuffer')

            const uint8Array = new Uint8Array(innerArrayBuffer);
            const stream = Stream.fromArrayBuffer(uint8Array.buffer);

            if (!Decoder.isFIT(stream)) {
                throw new Error("Invalid FIT file");
            }

            const decoder = new Decoder(stream);
            const { messages, errors } = decoder.read({
                applyScaleAndOffset: true,
                convertDateTimesToDates: true,
                convertTypesToStrings: true,
            });

            console.log("File: ", messages);
            console.log(errors);

            activityFiles.push(messages)



        }

        const newAll = [
            ...allActivities,
            ...activityFiles
        ]
        setAllActivities(newAll)
        handleLoadPerActivity(newAll);
    }

    const handleLoadPerActivity = async (activities: FitMessages[] = allActivities) => {

        const loadsArr: number[] = []

        for (const activity of activities) {
            const session = Array.isArray(activity.sessionMesgs) ? activity.sessionMesgs[0] : activity.sessionMesgs;
            const trainingLoadPeak = session?.trainingLoadPeak;
            console.log('Training load peak:', trainingLoadPeak);
            loadsArr.push(Number(trainingLoadPeak));
        }

        const trainingLoads = [
            ...activityLoads,
            ...loadsArr
        ]
        setActivityLoads(trainingLoads);
        //Need to get the data in a format for the graphs

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
                            Upload Single file
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => handleSingleFileUpload(event)}
                                multiple
                            />
                        </Button>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                        >
                            Upload ZIP
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => handleZIPFileUpload(event)}
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
                                <Paper elevation={0} sx={{ p: 3, height: 650, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Heart Rate Over Time</Typography>
                                    {/* <IndexLineChart data={ }></IndexLineChart> */}
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