export interface FileIdMesg {
    serialNumber: number;
    timeCreated: string;
    manufacturer: string;
    product: number;
    type: string;
    garminProduct: string;
}

export interface FileCreatorMesg {
    softwareVersion: number;
}

export interface EventMesg {
    timestamp: string;
    data: number;
    event: string;
    eventType: string;
    eventGroup?: number;
    timerTrigger?: string;
    coursePointIndex?: number;
}

export interface DeviceInfoMesg {
    timestamp: string;
    serialNumber?: number;
    manufacturer?: string;
    product?: number;
    softwareVersion?: number;
    deviceIndex: any;
    sourceType: string;
    garminProduct: any;
    deviceType?: number;
    localDeviceType: any;
}

export interface DeviceSettingsMesg {
    utcOffset: number;
    timeOffset: number;
    autoActivityDetect: string;
    autosyncMinSteps: number;
    autosyncMinTime: number;
    activeTimeZone: number;
    timeMode: string;
    timeZoneOffset: number;
    backlightMode: string;
    activityTrackerEnabled: number;
    moveAlertEnabled: number;
    dateMode: string;
    mountingSide: string;
    lactateThresholdAutodetectEnabled: number;
}

export interface UserProfileMesg {
    wakeTime: number;
    sleepTime: number;
    weight: number;
    userRunningStepLength: number;
    userWalkingStepLength: number;
    gender: string;
    height: number;
    language: string;
    elevSetting: string;
    weightSetting: string;
    restingHeartRate: number;
    hrSetting: string;
    speedSetting: string;
    distSetting: string;
    activityClass: number;
    positionSetting: string;
    temperatureSetting: string;
    heightSetting: string;
    depthSetting: string;
}

export interface SportMesg {
    name: string;
    sport: string;
    subSport: string;
}

export interface TrainingSettingsMesg {
    targetDistance: number;
    targetSpeed: number;
}

export interface ZonesTargetMesg {
    maxHeartRate: number;
    thresholdHeartRate: number;
    hrCalcType: string;
    pwrCalcType: string;
}

export interface TrainingFileMesg {
    timestamp: string;
    serialNumber: number;
    timeCreated: string;
    manufacturer: string;
    product: number;
    type: string;
    garminProduct: string;
}

export interface RecordMesg {
    timestamp: string;
    positionLat: number;
    positionLong: number;
    distance: number;
    enhancedSpeed: number;
    enhancedAltitude: number;
    heartRate: number;
    cadence: number;
    temperature: number;
    fractionalCadence: number;
    cycleLength16?: number;
}

export interface GpsMetadataMesg {
    enhancedAltitude: number;
    enhancedSpeed: number;
}

export interface LapMesg {
    timestamp: string;
    startTime: string;
    startPositionLat: number;
    startPositionLong: number;
    endPositionLat: number;
    endPositionLong: number;
    totalElapsedTime: number;
    totalTimerTime: number;
    totalDistance: number;
    totalCycles: number;
    enhancedAvgSpeed: number;
    enhancedMaxSpeed: number;
    enhancedMinAltitude: number;
    enhancedMaxAltitude: number;
    totalGrit: any;
    avgFlow: any;
    messageIndex: number;
    totalCalories: number;
    avgSpeed: number;
    maxSpeed: number;
    totalAscent: number;
    totalDescent: number;
    event: string;
    eventType: string;
    avgHeartRate: number;
    maxHeartRate: number;
    avgCadence: number;
    maxCadence: number;
    lapTrigger: string;
    sport: string;
    subSport: string;
    avgTemperature: number;
    maxTemperature: number;
    avgFractionalCadence: number;
    maxFractionalCadence: number;
    minTemperature: number;
    totalFractionalAscent: number;
    totalFractionalDescent: number;
}

export interface TimeInZoneMesg {
    timestamp: string;
    timeInHrZone: number[];
    referenceMesg: string;
    referenceIndex: number;
    hrZoneHighBoundary: number[];
    hrCalcType: string;
    maxHeartRate: number;
    restingHeartRate: number;
    thresholdHeartRate: number;
}

export interface SessionMesg {
    timestamp: string;
    startTime: string;
    startPositionLat: number;
    startPositionLong: number;
    totalElapsedTime: number;
    totalTimerTime: number;
    totalDistance: number;
    totalCycles: number;
    necLat: number;
    necLong: number;
    swcLat: number;
    swcLong: number;
    endPositionLat: number;
    endPositionLong: number;
    sportProfileName: string;
    enhancedAvgSpeed: number;
    enhancedMaxSpeed: number;
    trainingLoadPeak: number;
    totalGrit: any;
    avgFlow: any;
    messageIndex: number;
    totalCalories: number;
    avgSpeed: number;
    maxSpeed: number;
    totalAscent: number;
    totalDescent: number;
    firstLapIndex: number;
    numLaps: number;
    metabolicCalories: number;
    event: string;
    eventType: string;
    sport: string;
    subSport: string;
    avgHeartRate: number;
    maxHeartRate: number;
    avgCadence: number;
    maxCadence: number;
    totalTrainingEffect: number;
    trigger: string;
    avgTemperature: number;
    maxTemperature: number;
    avgFractionalCadence: number;
    maxFractionalCadence: number;
    totalAnaerobicTrainingEffect: number;
    minTemperature: number;
    totalFractionalAscent: number;
    totalFractionalDescent: number;
}

export interface ActivityMesg {
    timestamp: string;
    totalTimerTime: number;
    localTimestamp: number;
    numSessions: number;
    type: string;
    event: string;
    eventType: string;
}

export interface GarminFITActivity {
    fileIdMesgs: FileIdMesg[];
    fileCreatorMesgs: FileCreatorMesg[];
    eventMesgs: EventMesg[];
    deviceInfoMesgs: DeviceInfoMesg[];
    deviceSettingsMesgs: DeviceSettingsMesg[];
    userProfileMesgs: UserProfileMesg[];
    sportMesgs: SportMesg[];
    trainingSettingsMesgs: TrainingSettingsMesg[];
    zonesTargetMesgs: ZonesTargetMesg[];
    trainingFileMesgs: TrainingFileMesg[];
    recordMesgs: RecordMesg[];
    gpsMetadataMesgs: GpsMetadataMesg[];
    lapMesgs: LapMesg[];
    timeInZoneMesgs: TimeInZoneMesg[];
    sessionMesgs: SessionMesg[];
    activityMesgs: ActivityMesg[];
}