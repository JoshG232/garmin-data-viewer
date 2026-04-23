import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import type { LineChartTrainingLoadPoint } from '../Types/LineChart';
// import { RechartsDevtools } from '@recharts/devtools';
// import React from 'react';

// #region Sample data
// const data = [
//     {
//         name: 'A',
//         uv: 400,
//         pv: 240,
//         amt: 2400,
//     },
//     {
//         name: 'B',
//         uv: 300,
//         pv: 456,
//         amt: 2400,
//     },
//     {
//         name: 'C',
//         uv: 300,
//         pv: 139,
//         amt: 2400,
//     },
//     {
//         name: 'D',
//         uv: 200,
//         pv: 980,
//         amt: 2400,
//     },
//     {
//         name: 'E',
//         uv: 278,
//         pv: 390,
//         amt: 2400,
//     },
//     {
//         name: 'B',
//         uv: 189,
//         pv: 480,
//         amt: 2400,
//     },
// ];

// #endregion

interface LineChartProps {
    data: LineChartTrainingLoadPoint[];
}

export default function IndexLineChart({ data }: LineChartProps) {
    return (
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} responsive data={data}>
            <CartesianGrid stroke="grey" strokeDasharray="5 5" />
            <XAxis dataKey="date" stroke="black" />
            <YAxis width="auto" stroke="black" />
            <Line
                type="monotone"
                dataKey="trainingLoad"
                stroke="blue"
                dot={{
                    fill: 'blue',
                }}
                activeDot={{
                    stroke: 'blue',
                }}
            />


        </LineChart>
    );
}