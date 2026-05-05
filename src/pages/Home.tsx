import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, AppBar, Toolbar, Button, styled } from '@mui/material';
import { Decoder, Stream } from '@garmin/fitsdk';
import * as JSZip from 'jszip';
import IndexLineChart from '../components/LineChart';
import type { FitMessages } from '../Types/Activity';
import type { ActivityMesg, DeveloperDataIdMesg, DeviceInfoMesg, DeviceSettingsMesg, EventMesg, FieldDescriptionMesg, FileCreatorMesg, FileIdMesg, GarminFITActivity, GpsMetadataMesg, LapMesg, RecordMesg, SessionMesg, SportMesg, TimeInZoneMesg, TrainingSettingsMesg, UserProfileMesg, ZonesTargetMesg } from '../Types/GarminFITActivity';
import type { LineChartTotalDistancePoint, LineChartTrainingLoadPoint } from '../Types/LineChart';
import IndexLineChartDistance from '../components/LineChart-Distance';
import StackedBarChart from '../components/StackedBarChar-Zones';
import type { BarChartTimeInZone } from '../Types/BarChart';




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
    //Distances
    const [totalDistance, setTotalDistance] = useState(0);
    const [distanceOverTime, setdistanceOverTime] = useState<LineChartTotalDistancePoint[]>([]);
    const [distanceOverTimeInWeekBlock, setdistanceOverTimeInWeekBlock] = useState<LineChartTotalDistancePoint[]>([]);

    //Time in Zone
    const [timeInZoneOverTime, setTimeInZoneOverTime] = useState<BarChartTimeInZone[]>([]);
    const [timeInZoneOverTimeInWeekBlock, setTimeInZoneOverTimeInWeekBlock] = useState<BarChartTimeInZone[]>([]);

    //Total time
    const [totalTime, setTotalTime] = useState(0);

    //Total Ascent
    const [totalAscent, setTotalAscent] = useState(0);

    //Total heart beats
    const [totalHeartBeats, setTotalHeartBeats] = useState(0);

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
        handleWeeklyDistance(newAll);
        handleWeeklyTimeInZone(newAll);
    }
    const handleLoadPerActivity = async (activities: FitMessages[] = allActivities) => {
        const loadsArr: LineChartTrainingLoadPoint[] = [];
        const loadsWeeklyArr: LineChartTrainingLoadPoint[] = [];

        for (const activity of activities) {
            const session = Array.isArray(activity.sessionMesgs) ? activity.sessionMesgs[0] : activity.sessionMesgs;
            const trainingLoadPeak = session?.trainingLoadPeak;
            const timestamp = session?.timestamp;
            // console.log('Training load peak:', trainingLoadPeak);

            const formattedDate = formatDate(timestamp);

            const trainingLoad: LineChartTrainingLoadPoint = {
                date: formattedDate,
                trainingLoad: trainingLoadPeak
            }

            loadsArr.push(trainingLoad);
        }
        // console.log(loadsArr);

        for (const load of loadsArr) {
            // console.log("Week: ", load.date, " Week commencing: ", formatDate(String(weekCommencing(load.date))));
            const wcFormatedDate = formatDate(String(weekCommencing(load.date)))

            const trainingLoad: LineChartTrainingLoadPoint = {
                date: wcFormatedDate,
                trainingLoad: load.trainingLoad
            }

            const alreadyInArr = loadsWeeklyArr.some(existingLoad => existingLoad.date === trainingLoad.date)
            if (alreadyInArr) {
                // console.log("In array")
                const loadObject = loadsWeeklyArr.find(item => item.date === trainingLoad.date);
                if (loadObject) {
                    // console.log("Adding ", loadObject.trainingLoad, " and ", trainingLoad.trainingLoad);
                    loadObject.trainingLoad = loadObject.trainingLoad + trainingLoad.trainingLoad;

                }
            } else {
                loadsWeeklyArr.push(trainingLoad)
            }



        }

        // console.log(loadsWeeklyArr);
        setTrainingLoadOverTime(prev => [...prev, ...loadsArr]);
        setTrainingLoadOverTimeInWeekBlock(prev => [...prev, ...loadsWeeklyArr])
    }
    const handleWeeklyDistance = async (activities: FitMessages[] = allActivities) => {
        const distanceArr: LineChartTotalDistancePoint[] = [];
        const distanceWeeklyArr: LineChartTotalDistancePoint[] = [];


        for (const activity of activities) {
            const session = Array.isArray(activity.sessionMesgs) ? activity.sessionMesgs[0] : activity.sessionMesgs;
            const timestamp = session?.timestamp;
            const distance = session?.totalDistance;
            const time = session?.totalElapsedTime;
            const ascent = session?.totalAscent;
            const heartBeats = session?.avgHeartRate ?? 0;

            setTotalHeartBeats(prev => prev + (((heartBeats ?? 0) * (time / 1000))));
            setTotalTime(prev => prev + time);
            setTotalAscent(prev => prev + (ascent ?? 0));

            const formattedDate = formatDate(timestamp);

            const totalDistance: LineChartTotalDistancePoint = {
                date: formattedDate,
                totalDistance: distance
            }

            distanceArr.push(totalDistance);
        }
        // console.log(distanceArr);

        for (const distance of distanceArr) {
            // console.log("Week: ", distance.date, " Week commencing: ", formatDate(String(weekCommencing(distance.date))));
            const wcFormatedDate = formatDate(String(weekCommencing(distance.date)))

            const totalDistance: LineChartTotalDistancePoint = {
                date: wcFormatedDate,
                totalDistance: distance.totalDistance
            }

            setTotalDistance(prev => prev + totalDistance.totalDistance);

            const alreadyInArr = distanceWeeklyArr.some(existingLoad => existingLoad.date === totalDistance.date)
            if (alreadyInArr) {
                // console.log("In array")
                const loadObject = distanceWeeklyArr.find(item => item.date === totalDistance.date);
                if (loadObject) {
                    // console.log("Adding ", loadObject.totalDistance, " and ", totalDistance.totalDistance);
                    loadObject.totalDistance = loadObject.totalDistance + totalDistance.totalDistance;

                }
            } else {
                distanceWeeklyArr.push(totalDistance)
            }
        }
        setdistanceOverTime(prev => [...prev, ...distanceWeeklyArr]);
        setdistanceOverTimeInWeekBlock(prev => [...prev, ...distanceWeeklyArr])



    }
    const handleWeeklyTimeInZone = async (activities: FitMessages[] = allActivities) => {
        const timeInZoneArr: BarChartTimeInZone[] = [];
        const timeInZoneWeeklyArr: BarChartTimeInZone[] = [];

        for (const activity of activities) {
            const timeInZoneFull = Array.isArray(activity.timeInZoneMesgs) ? activity.timeInZoneMesgs[0] : activity.timeInZoneMesgs;
            const timestamp = timeInZoneFull?.timestamp;
            const zone1 = timeInZoneFull?.timeInHrZone[0];
            const zone2 = timeInZoneFull?.timeInHrZone[1];
            const zone3 = timeInZoneFull?.timeInHrZone[2];
            const zone4 = timeInZoneFull?.timeInHrZone[3];
            const zone5 = timeInZoneFull?.timeInHrZone[4];

            const formattedDate = formatDate(timestamp);

            const timeInZone: BarChartTimeInZone = {
                date: formattedDate,
                zone1: zone1,
                zone2: zone2,
                zone3: zone3,
                zone4: zone4,
                zone5: zone5
            }

            timeInZoneArr.push(timeInZone);
        }
        // console.log(timeInZoneArr);

        for (const timeInZoneTime of timeInZoneArr) {
            const wcFormatedDate = formatDate(String(weekCommencing(timeInZoneTime.date)))

            const timeInZone: BarChartTimeInZone = {
                date: wcFormatedDate ?? null,
                zone1: timeInZoneTime.zone1 ?? 0,
                zone2: timeInZoneTime.zone2 ?? 0,
                zone3: timeInZoneTime.zone3 ?? 0,
                zone4: timeInZoneTime.zone4 ?? 0,
                zone5: timeInZoneTime.zone5 ?? 0,
            }

            const alreadyInArr = timeInZoneWeeklyArr.some(existingLoad => existingLoad.date === timeInZone.date)
            if (alreadyInArr) {
                // console.log("In array")
                const loadObject = timeInZoneWeeklyArr.find(item => item.date === timeInZone.date);
                if (loadObject) {
                    loadObject.zone1 = loadObject.zone1 + timeInZone.zone1;
                    loadObject.zone2 = loadObject.zone2 + timeInZone.zone2;
                    loadObject.zone3 = loadObject.zone3 + timeInZone.zone3;
                    loadObject.zone4 = loadObject.zone4 + timeInZone.zone4;
                    loadObject.zone5 = loadObject.zone5 + timeInZone.zone5;

                }
            } else {
                timeInZoneWeeklyArr.push(timeInZone)
            }
        }
        setTimeInZoneOverTime(prev => [...prev, ...timeInZoneWeeklyArr]);
        setTimeInZoneOverTimeInWeekBlock(prev => [...prev, ...timeInZoneWeeklyArr])
    }

    const formatTotalTime = (totalSeconds: number): string => {
        if (totalSeconds < 0) return "0 hrs and 0 minutes";

        const hours = Math.floor(totalSeconds / 3600);
        const remainingSeconds = totalSeconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);

        return `${hours} hrs and ${minutes} minutes`;
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
                            <Grid container size={12} sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Grid size={2.4}><Paper>{(totalDistance / 1000).toFixed(2)} km</Paper></Grid>
                                <Grid size={2.4}><Paper>{formatTotalTime(totalTime)}</Paper></Grid>
                                <Grid size={2.4}><Paper>{totalAscent} m</Paper></Grid>
                                <Grid size={2.4}><Paper>{totalHeartBeats.toFixed(2)} beats</Paper></Grid>
                                <Grid size={2.4}><Paper>Hello</Paper></Grid>
                            </Grid>
                            <Grid size={6}>
                                <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Training Load over time</Typography>
                                    <IndexLineChart data={trainingLoadOverTime}></IndexLineChart>
                                </Paper>
                            </Grid>
                            <Grid size={6}>
                                <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Training Load over time (Weekly)</Typography>
                                    <IndexLineChart data={trainingLoadOverTimeInWeekBlock}></IndexLineChart>
                                </Paper>
                            </Grid>
                            <Grid size={6}>
                                <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Distance per week</Typography>
                                    <IndexLineChartDistance data={distanceOverTimeInWeekBlock}></IndexLineChartDistance>
                                </Paper>
                            </Grid>
                            <Grid size={6}>
                                <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Time in zones</Typography>
                                    <StackedBarChart data={timeInZoneOverTimeInWeekBlock}></StackedBarChart>
                                </Paper>
                            </Grid>
                            <Grid size={12}>
                                <Paper elevation={0} sx={{ p: 1, border: 1, borderColor: 'divider' }}>
                                    <Typography variant="subtitle2" color="textSecondary">Totals</Typography>
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