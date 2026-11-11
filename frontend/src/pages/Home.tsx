import React, { useEffect, useEffectEvent, useState } from 'react';
import { Box, Grid, Paper, Typography, AppBar, Toolbar, Button, styled } from '@mui/material';
import IndexLineChart from '../components/LineChart';
import type { Activity } from '../Types/Activity';
import type { ActivityMesg, DeveloperDataIdMesg, DeviceInfoMesg, DeviceSettingsMesg, EventMesg, FieldDescriptionMesg, FileCreatorMesg, FileIdMesg, GarminFITActivity, GpsMetadataMesg, LapMesg, RecordMesg, SessionMesg, SportMesg, TimeInZoneMesg, TrainingSettingsMesg, UserProfileMesg, ZonesTargetMesg } from '../Types/GarminFITActivity';
import type { LineChartTotalDistancePoint, LineChartTrainingLoadPoint } from '../Types/LineChart';
import IndexLineChartDistance from '../components/LineChart-Distance';
import StackedBarChart from '../components/StackedBarChar-Zones';
import type { BarChartTimeInZone } from '../Types/BarChart';
import ActivityTable from '../components/ActivityTable';
import { getUserProfile } from '../api/userprofile'
import type { UserProfile } from '../Types/UserProfile';
import { getActivities } from '../api/activity';

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

    const [activities, setActivities] = useState<Activity[]>([]);
    // const [allActivities, setAllActivities] = useState<FitMessages[]>([]);
    // const [activityLoads, setActivityLoads] = useState<number[]>([]);
    const [trainingLoadOverTime, setTrainingLoadOverTime] = useState<LineChartTrainingLoadPoint[]>([]);
    const [trainingLoadOverTimeInWeekBlock, setTrainingLoadOverTimeInWeekBlock] = useState<LineChartTrainingLoadPoint[]>([]);
    //Distances
    const [totalDistance, setTotalDistance] = useState(0);
    const [, setdistanceOverTime] = useState<LineChartTotalDistancePoint[]>([]);
    const [distanceOverTimeInWeekBlock, setdistanceOverTimeInWeekBlock] = useState<LineChartTotalDistancePoint[]>([]);

    //Time in Zone
    const [, setTimeInZoneOverTime] = useState<BarChartTimeInZone[]>([]);
    const [timeInZoneOverTimeInWeekBlock, setTimeInZoneOverTimeInWeekBlock] = useState<BarChartTimeInZone[]>([]);

    //Total time
    const [totalTime, setTotalTime] = useState(0);

    //Total Ascent
    const [totalAscent, setTotalAscent] = useState(0);

    //Total heart beats
    const [totalHeartBeats, setTotalHeartBeats] = useState(0);

    //Total Activities
    const [totalActivities, setTotalActivities] = useState(0);

    useEffect(() => {
        console.log("HelloWorld!");
        handleDataFetch();
    }, []);

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


    const handleDataFetch = async () => {

        let userProfileTemp: UserProfile;
        let activitiesTemp: Activity[];

        try {
            userProfileTemp = await getUserProfile()
        } catch (error) {
            console.error("Error loading user profile:", error)
            return;
        }
        try {
            activitiesTemp = await getActivities()
        } catch (error) {
            console.error("Error loading user profile:", error)
            return;
        }

        const userProfile: UserProfile = userProfileTemp;
        setActivities(activitiesTemp)

        console.log("First day of the week: ", userProfile.firstDayOfWeek.dayName);
        console.log("Activities: ", activities);

        

        const activityFiles: object[] = []
        const garminActArr: GarminFITActivity[] = [];

        

    }
    // const handleLoadPerActivity = async (activities: FitMessages[] = allActivities) => {
    //     const loadsArr: LineChartTrainingLoadPoint[] = [];
    //     const loadsWeeklyArr: LineChartTrainingLoadPoint[] = [];

    //     for (const activity of activities) {
    //         const session = Array.isArray(activity.sessionMesgs) ? activity.sessionMesgs[0] : activity.sessionMesgs;
    //         const trainingLoadPeak = session?.trainingLoadPeak;
    //         const timestamp = session?.timestamp;
    //         // console.log('Training load peak:', trainingLoadPeak);

    //         const formattedDate = formatDate(timestamp);

    //         const trainingLoad: LineChartTrainingLoadPoint = {
    //             date: formattedDate,
    //             trainingLoad: trainingLoadPeak
    //         }

    //         loadsArr.push(trainingLoad);
    //     }
    //     // console.log(loadsArr);

    //     for (const load of loadsArr) {
    //         // console.log("Week: ", load.date, " Week commencing: ", formatDate(String(weekCommencing(load.date))));
    //         const wcFormatedDate = formatDate(String(weekCommencing(load.date)))

    //         const trainingLoad: LineChartTrainingLoadPoint = {
    //             date: wcFormatedDate,
    //             trainingLoad: load.trainingLoad
    //         }

    //         const alreadyInArr = loadsWeeklyArr.some(existingLoad => existingLoad.date === trainingLoad.date)
    //         if (alreadyInArr) {
    //             // console.log("In array")
    //             const loadObject = loadsWeeklyArr.find(item => item.date === trainingLoad.date);
    //             if (loadObject) {
    //                 // console.log("Adding ", loadObject.trainingLoad, " and ", trainingLoad.trainingLoad);
    //                 loadObject.trainingLoad = loadObject.trainingLoad + trainingLoad.trainingLoad;

    //             }
    //         } else {
    //             loadsWeeklyArr.push(trainingLoad)
    //         }



    //     }

    //     // console.log(loadsWeeklyArr);
    //     setTrainingLoadOverTime(prev => [...prev, ...loadsArr]);
    //     setTrainingLoadOverTimeInWeekBlock(prev => [...prev, ...loadsWeeklyArr])
    // }
    // const handleWeeklyDistance = async (activities: FitMessages[] = allActivities) => {
    //     const distanceArr: LineChartTotalDistancePoint[] = [];
    //     const distanceWeeklyArr: LineChartTotalDistancePoint[] = [];


    //     for (const activity of activities) {
    //         const session = Array.isArray(activity.sessionMesgs) ? activity.sessionMesgs[0] : activity.sessionMesgs;
    //         const timestamp = session?.timestamp;
    //         const distance = session?.totalDistance;
    //         const time = session?.totalElapsedTime;
    //         const ascent = session?.totalAscent;
    //         const heartBeats = session?.avgHeartRate ?? 0;

    //         setTotalActivities(prev => prev + 1);
    //         setTotalHeartBeats(prev => prev + (((heartBeats ?? 0) * (time / 1000))));
    //         setTotalTime(prev => prev + time);
    //         setTotalAscent(prev => prev + (ascent ?? 0));

    //         const formattedDate = formatDate(timestamp);

    //         const totalDistance: LineChartTotalDistancePoint = {
    //             date: formattedDate,
    //             totalDistance: distance
    //         }

    //         distanceArr.push(totalDistance);
    //     }
    //     // console.log(distanceArr);

    //     for (const distance of distanceArr) {
    //         // console.log("Week: ", distance.date, " Week commencing: ", formatDate(String(weekCommencing(distance.date))));
    //         const wcFormatedDate = formatDate(String(weekCommencing(distance.date)))

    //         const totalDistance: LineChartTotalDistancePoint = {
    //             date: wcFormatedDate,
    //             totalDistance: distance.totalDistance
    //         }

    //         setTotalDistance(prev => prev + totalDistance.totalDistance);

    //         const alreadyInArr = distanceWeeklyArr.some(existingLoad => existingLoad.date === totalDistance.date)
    //         if (alreadyInArr) {
    //             // console.log("In array")
    //             const loadObject = distanceWeeklyArr.find(item => item.date === totalDistance.date);
    //             if (loadObject) {
    //                 // console.log("Adding ", loadObject.totalDistance, " and ", totalDistance.totalDistance);
    //                 loadObject.totalDistance = loadObject.totalDistance + totalDistance.totalDistance;

    //             }
    //         } else {
    //             distanceWeeklyArr.push(totalDistance)
    //         }
    //     }
    //     setdistanceOverTime(prev => [...prev, ...distanceWeeklyArr]);
    //     setdistanceOverTimeInWeekBlock(prev => [...prev, ...distanceWeeklyArr])



    // }
    // const handleWeeklyTimeInZone = async (activities: FitMessages[] = allActivities) => {
    //     const timeInZoneArr: BarChartTimeInZone[] = [];
    //     const timeInZoneWeeklyArr: BarChartTimeInZone[] = [];

    //     for (const activity of activities) {
    //         const timeInZoneFull = Array.isArray(activity.timeInZoneMesgs) ? activity.timeInZoneMesgs[0] : activity.timeInZoneMesgs;
    //         const timestamp = timeInZoneFull?.timestamp;
    //         const zone1 = timeInZoneFull?.timeInHrZone[0];
    //         const zone2 = timeInZoneFull?.timeInHrZone[1];
    //         const zone3 = timeInZoneFull?.timeInHrZone[2];
    //         const zone4 = timeInZoneFull?.timeInHrZone[3];
    //         const zone5 = timeInZoneFull?.timeInHrZone[4];

    //         const formattedDate = formatDate(timestamp);

    //         const timeInZone: BarChartTimeInZone = {
    //             date: formattedDate,
    //             zone1: zone1,
    //             zone2: zone2,
    //             zone3: zone3,
    //             zone4: zone4,
    //             zone5: zone5
    //         }

    //         timeInZoneArr.push(timeInZone);
    //     }
    //     // console.log(timeInZoneArr);

    //     for (const timeInZoneTime of timeInZoneArr) {
    //         const wcFormatedDate = formatDate(String(weekCommencing(timeInZoneTime.date)))

    //         const timeInZone: BarChartTimeInZone = {
    //             date: wcFormatedDate ?? null,
    //             zone1: timeInZoneTime.zone1 ?? 0,
    //             zone2: timeInZoneTime.zone2 ?? 0,
    //             zone3: timeInZoneTime.zone3 ?? 0,
    //             zone4: timeInZoneTime.zone4 ?? 0,
    //             zone5: timeInZoneTime.zone5 ?? 0,
    //         }

    //         const alreadyInArr = timeInZoneWeeklyArr.some(existingLoad => existingLoad.date === timeInZone.date)
    //         if (alreadyInArr) {
    //             // console.log("In array")
    //             const loadObject = timeInZoneWeeklyArr.find(item => item.date === timeInZone.date);
    //             if (loadObject) {
    //                 loadObject.zone1 = loadObject.zone1 + timeInZone.zone1;
    //                 loadObject.zone2 = loadObject.zone2 + timeInZone.zone2;
    //                 loadObject.zone3 = loadObject.zone3 + timeInZone.zone3;
    //                 loadObject.zone4 = loadObject.zone4 + timeInZone.zone4;
    //                 loadObject.zone5 = loadObject.zone5 + timeInZone.zone5;

    //             }
    //         } else {
    //             timeInZoneWeeklyArr.push(timeInZone)
    //         }
    //     }
    //     setTimeInZoneOverTime(prev => [...prev, ...timeInZoneWeeklyArr]);
    //     setTimeInZoneOverTimeInWeekBlock(prev => [...prev, ...timeInZoneWeeklyArr])
    // }
    // const formatTotalTime = (totalSeconds: number): string => {
    //     if (totalSeconds < 0) return "0 hrs and 0 minutes";

    //     const hours = Math.floor(totalSeconds / 3600);
    //     const remainingSeconds = totalSeconds % 3600;
    //     const minutes = Math.floor(remainingSeconds / 60);

    //     return `${hours} hrs and ${minutes} minutes`;
    // }


    return (
        <>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                            Garmin Data Viewer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", direction: "column" }}>
                    <Box sx={{ py: 4, width: "90%" }}>
                        <Grid container spacing={2}>
                            <ActivityTable data={activities}/>
                        </Grid>
                    </Box>
                </Box>


            </Box>
        </>
    );
};


export default Home;