import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import type { LineChartTrainingLoadPoint } from '../Types/LineChart';

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