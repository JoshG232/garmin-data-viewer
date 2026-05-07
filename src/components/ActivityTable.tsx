import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { GarminFITActivity } from '../Types/GarminFITActivity';

interface BasicTableProps {
    data: GarminFITActivity[];
}


const formatDistance = (m?: number) => (m == null ? '-' : `${(m / 1000).toFixed(2)} km`);
const formatTime = (s?: number) => {
    if (s == null) return '-';
    const total = Math.round(s);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const sec = total % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    return `${m}:${sec.toString().padStart(2, '0')}`;
};
const formatElevation = (m?: number) => (m == null ? '-' : `${Math.round(m)} m`);

export default function BasicTable({ data }: BasicTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Sport</TableCell>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="right">Elevation</TableCell>
                        <TableCell align="right">Avg HR</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => {
                        const session = row.sessionMesgs?.[0];
                        const sport = session?.sport;
                        const distance = session?.totalDistance
                        const time = session?.totalElapsedTime;
                        const elevation = session?.totalAscent;
                        const avgHR = session?.avgHeartRate;

                        return (
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{sport}</TableCell>
                                <TableCell align="right">{formatDistance(distance)}</TableCell>
                                <TableCell align="right">{formatTime(time)}</TableCell>
                                <TableCell align="right">{formatElevation(elevation)}</TableCell>
                                <TableCell align="right">{avgHR ?? '-'}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}