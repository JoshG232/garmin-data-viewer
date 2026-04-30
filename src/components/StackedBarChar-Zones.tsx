import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { BarChartTimeInZone } from '../Types/BarChart';


// #region Sample data
interface BarChartProps {
    data: BarChartTimeInZone[];
}

// #endregion
export default function StackedBarChart({ data }: BarChartProps) {
    return (
        <BarChart
            style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }}
            responsive
            data={data}
            margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" niceTicks="snap125" />
            <YAxis width="auto" niceTicks="snap125" />
            <Tooltip />
            <Legend />
            <Bar dataKey="zone1" stackId="a" fill="#a9a9a9" background />
            <Bar dataKey="zone2" stackId="a" fill="#36a9ed" background />
            <Bar dataKey="zone3" stackId="a" fill="#50af13" background />
            <Bar dataKey="zone4" stackId="a" fill="#f79d0b" background />
            <Bar dataKey="zone5" stackId="a" fill="#eb222f" background />
            {/* <RechartsDevtools /> */}
        </BarChart>
    );
};