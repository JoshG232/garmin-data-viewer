export interface FirstDayOfWeek {
    dayId: number;
    dayName: string;
    sortOrder: number;
    isPossibleFirstDay: boolean;
}

export interface ProfileFormat {
    formatId: number;
    formatKey: string;
    minFraction: number;
    maxFraction: number;
    groupingUsed: boolean;
    displayFormat: string | null;
}

export interface HydrationContainer {
    name: string | null;
    volume: number;
    unit: string;
}

export interface UserProfile {
    displayName: string;
    preferredLocale: string;
    measurementSystem: string;
    firstDayOfWeek: FirstDayOfWeek;
    numberFormat: string;
    timeFormat: ProfileFormat;
    dateFormat: ProfileFormat;
    powerFormat: ProfileFormat;
    heartRateFormat: ProfileFormat;
    timeZone: string;
    hydrationMeasurementUnit: string;
    hydrationContainers: HydrationContainer[];
    golfDistanceUnit: string;
    golfElevationUnit: string | null;
    golfSpeedUnit: string | null;
    availableTrainingDays: number[] | null;
    preferredLongTrainingDays: number[] | null;
}
