import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, AppBar, Toolbar, Button, styled } from '@mui/material';
import { Decoder, Stream } from '@garmin/fitsdk';
import * as JSZip from 'jszip';
import IndexLineChart from '../components/LineChart';
import type { FitMessages } from '../Types/Activity';
import type { ActivityMesg, DeveloperDataIdMesg, DeviceInfoMesg, DeviceSettingsMesg, EventMesg, FieldDescriptionMesg, FileCreatorMesg, FileIdMesg, GarminFITActivity, GpsMetadataMesg, LapMesg, RecordMesg, SessionMesg, SportMesg, TimeInZoneMesg, TrainingSettingsMesg, UserProfileMesg, ZonesTargetMesg } from '../Types/GarminFITActivity';
import type { LineChartTrainingLoadPoint } from '../Types/LineChart';




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
    const [trainingLoadOverTime, setTrainingLoadOverTime] = useState<LineChartTrainingLoadPoint[]>([]);
    const [trainingLoadOverTimeInWeekBlock, setTrainingLoadOverTimeInWeekBlock] = useState<LineChartTrainingLoadPoint[]>([]);

    const weekCommencing = (date: string) => {
        const americanDate = date[3] + date[4] + "/" + date[0] + date[1] + "/" + date[6] + date[7] + date[8] + date[9];
        const dateType = new Date(americanDate);
        const diff = dateType.getDate() - dateType.getDay() + (dateType.getDay() === 0 ? -6 : 1);
        return new Date(dateType.setDate(diff))
    }

    const formatDate = (timestamp: string) => {
        let formattedDate = '';
        if (timestamp) {
            const dateOfActivity = new Date(timestamp);
            const pad = (num: number) => String(num).padStart(2, '0');
            formattedDate = `${pad(dateOfActivity.getDate())}/${pad(dateOfActivity.getMonth() + 1)}/${dateOfActivity.getFullYear()}`;
        }
        return formattedDate;
    }
    const generateFITObject = (fitObject: any) => {
        const activityMesgs: ActivityMesg[] = fitObject["activityMesgs"]
        const developerDataIdMesgs: DeveloperDataIdMesg[] = fitObject["developerDataIdMesgs"]
        const deviceInfoMesgs: DeviceInfoMesg[] = fitObject["deviceInfoMesgs"];
        const deviceSettingsMesgs: DeviceSettingsMesg[] = fitObject["deviceSettingsMesgs"];
        const eventMesgs: EventMesg[] = fitObject["eventMesgs"];
        const fieldDescriptionMesgs: FieldDescriptionMesg[] = fitObject["fieldDescriptionMesgs"];
        const fileCreatorMesgs: FileCreatorMesg[] = fitObject["fileCreatorMesgs"];
        const fileIdMesgs: FileIdMesg[] = fitObject["fileIdMesgs"];
        const gpsMetadataMesgs: GpsMetadataMesg[] = fitObject["gpsMetadataMesgs"];
        const lapMesgs: LapMesg[] = fitObject["lapMesgs"];
        const recordMesgs: RecordMesg[] = fitObject["recordMesgs"];
        const sessionMesgs: SessionMesg[] = fitObject["sessionMesgs"]
        const sportMesgs: SportMesg[] = fitObject["sportMesgs"];
        const timeInZoneMesgs: TimeInZoneMesg[] = fitObject["timeInZoneMesgs"];
        const trainingSettingsMesgs: TrainingSettingsMesg[] = fitObject["trainingSettingsMesgs"];
        const userProfileMesgs: UserProfileMesg[] = fitObject["userProfileMesgs"];
        const zonesTargetMesgs: ZonesTargetMesg[] = fitObject["zonesTargetMesgs"];


        const garminFitActivity: GarminFITActivity = {
            activityMesgs: activityMesgs,
            developerDataIdMesgs: developerDataIdMesgs,
            deviceInfoMesgs: deviceInfoMesgs,
            deviceSettingsMesgs: deviceSettingsMesgs,
            eventMesgs: eventMesgs,
            fieldDescriptionMesgs: fieldDescriptionMesgs,
            fileCreatorMesgs: fileCreatorMesgs,
            fileIdMesgs: fileIdMesgs,
            gpsMetadataMesgs: gpsMetadataMesgs,
            lapMesgs: lapMesgs,
            recordMesgs: recordMesgs,
            sessionMesgs: sessionMesgs,
            sportMesgs: sportMesgs,
            timeInZoneMesgs: timeInZoneMesgs,
            trainingSettingsMesgs: trainingSettingsMesgs,
            userProfileMesgs: userProfileMesgs,
            zonesTargetMesgs: zonesTargetMesgs,
        }

        // console.log("Transformed activity", garminFitActivity)
        return garminFitActivity;
    }

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

        const obj = generateFITObject(messages);
        console.log(obj);

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

            let messages: any;
            let errors: any;

            try {
                const result = decoder.read({
                    applyScaleAndOffset: true,
                    convertDateTimesToDates: true,
                    convertTypesToStrings: true,
                });
                messages = result.messages;
                errors = result.errors;
            } catch (error) {
                console.error("Error reading in FIT file: ", errors);
                console.error(error);
            }

            const singleActivity = generateFITObject(messages);

            activityFiles.push(singleActivity)

        }
        //Setting it to newAll first to trigger the state update of handleLoadPerActivity with the 
        //correct data because updating the state is asynchronous

        const newAll = [
            ...allActivities,
            ...activityFiles
        ]
        console.log("All activities: ", newAll);
        setAllActivities(newAll)
        handleLoadPerActivity(newAll);
    }

    const handleLoadPerActivity = async (activities: FitMessages[] = allActivities) => {
        const loadsArr: LineChartTrainingLoadPoint[] = [];
        const loadsWeeklyArr: LineChartTrainingLoadPoint[] = [];

        for (const activity of activities) {
            const session = Array.isArray(activity.sessionMesgs) ? activity.sessionMesgs[0] : activity.sessionMesgs;
            const trainingLoadPeak = session?.trainingLoadPeak;
            const timestamp = session?.timestamp;
            console.log('Training load peak:', trainingLoadPeak);

            const formattedDate = formatDate(timestamp);

            const trainingLoad: LineChartTrainingLoadPoint = {
                date: formattedDate,
                trainingLoad: trainingLoadPeak
            }

            loadsArr.push(trainingLoad);
        }
        console.log(loadsArr);

        for (const load of loadsArr) {
            console.log("Week: ", load.date, " Week commencing: ", formatDate(String(weekCommencing(load.date))));
            const wcFormatedDate = formatDate(String(weekCommencing(load.date)))

            const trainingLoad: LineChartTrainingLoadPoint = {
                date: wcFormatedDate,
                trainingLoad: load.trainingLoad
            }

            const alreadyInArr = loadsWeeklyArr.some(existingLoad => existingLoad.date === trainingLoad.date)
            if (alreadyInArr) {
                console.log("In array")
                const loadObject = loadsWeeklyArr.find(item => item.date === trainingLoad.date);
                if (loadObject) {
                    console.log("Adding ", loadObject.trainingLoad, " and ", trainingLoad.trainingLoad);
                    loadObject.trainingLoad = loadObject.trainingLoad + trainingLoad.trainingLoad;

                }
            } else {
                loadsWeeklyArr.push(trainingLoad)
            }



        }

        console.log(loadsWeeklyArr);
        setTrainingLoadOverTime(prev => [...prev, ...loadsArr]);
        setTrainingLoadOverTimeInWeekBlock(prev => [...prev, ...loadsWeeklyArr])
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
                            <Grid size={6}>
                                <Paper elevation={0} sx={{ p: 3, height: 650, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Training Load over time</Typography>
                                    <IndexLineChart data={trainingLoadOverTime}></IndexLineChart>
                                </Paper>
                            </Grid>
                            <Grid size={6}>
                                <Paper elevation={0} sx={{ p: 3, height: 650, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Training Load over time (Weekly)</Typography>
                                    <IndexLineChart data={trainingLoadOverTimeInWeekBlock}></IndexLineChart>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>


            </Box>
        </>
    );
};


export default Home;