export interface Activity {
    "Activity Type": string
    Date: string
    Title: string
}

export interface FitMessages {
    sessionMesgs?: {
        trainingLoadPeak?: number | Record<string, any>;
        [k: string]: any;
    };
    [k: string]: any;
}

export interface LineChartData {
    data: Array<{
        name: string;
        load: number
    }>;
}