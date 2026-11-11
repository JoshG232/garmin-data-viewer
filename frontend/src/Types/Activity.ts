export interface ActivityType {
    typeId: number;
    typeKey: string;
    parentTypeId: number | null;
}

export interface ActivityEventType {
    typeId: number;
    typeKey: string;
}

export interface ActivityPrivacy {
    typeId: number;
    typeKey: string;
}

export interface SummarizedDiveInfo {
    summarizedDiveGases: Record<string, unknown>[];
}

export interface ActivityResponse {
    activityId: number;
    activityName: string;
    startTimeLocal: string;
    startTimeGMT: string | null;
    activityType: ActivityType;
    eventType: ActivityEventType | null;
    isFavorite: boolean | null;
    isPR: boolean | null;
    isAutoCalcCalories: boolean | null;
    isParent: boolean | null;
    distance: number | null;
    duration: number | null;
    elapsedDuration: number | null;
    movingDuration: number | null;
    elevationGain: number | null;
    elevationLoss: number | null;
    averageSpeed: number | null;
    maxSpeed: number | null;
    startLatitude: number | null;
    startLongitude: number | null;
    hasImages: boolean | null;
    ownerId: number | null;
    ownerDisplayName: string | null;
    ownerFullName: string | null;
    ownerProfileImageUrlSmall: string | null;
    ownerProfileImageUrlMedium: string | null;
    ownerProfileImageUrlLarge: string | null;
    calories: number | null;
    bmrCalories: number | null;
    averageHR: number | null;
    maxHR: number | null;
    privacy: ActivityPrivacy | null;
    hasVideo: boolean | null;
    beginTimestamp: number | null;
    sportTypeId: number | null;
    aerobicTrainingEffect: number | null;
    anaerobicTrainingEffect: number | null;
    minTemperature: number | null;
    maxTemperature: number | null;
    minElevation: number | null;
    maxElevation: number | null;
    avgElevation: number | null;
    isElevationCorrected: boolean | null;
    isDecoDive: boolean | null;
    summarizedDiveInfo: SummarizedDiveInfo | null;
    maxVerticalSpeed: number | null;
    manufacturer: string | null;
    locationName: string | null;
    lapCount: number | null;
    endLatitude: number | null;
    endLongitude: number | null;
    waterEstimated: number | null;
    minRespirationRate: number | null;
    maxRespirationRate: number | null;
    avgRespirationRate: number | null;
    trainingEffectLabel: string | null;
    activityTrainingLoad: number | null;
    minActivityLapDuration: number | null;
    aerobicTrainingEffectMessage: string | null;
    anaerobicTrainingEffectMessage: string | null;
    splitSummaries: Record<string, unknown>[] | null;
    isManualActivity: boolean | null;
    moderateIntensityMinutes: number | null;
    vigorousIntensityMinutes: number | null;
    hrTimeInZone_1: number | null;
    hrTimeInZone_2: number | null;
    hrTimeInZone_3: number | null;
    hrTimeInZone_4: number | null;
    hrTimeInZone_5: number | null;
    endTimeGMT: string | null;
    qualifyingDive: boolean | null;
    activityUUID: string | null;
    autoCalcCalories: boolean | null;
    decoDive: boolean | null;
    elevationCorrected: boolean | null;
    manualActivity: boolean | null;
    favorite: boolean | null;
    parent: boolean | null;
    pr: boolean | null;
}

export type Activity = ActivityResponse;
