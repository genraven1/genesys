import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import Minion from '../models/Minion';
import ActorService from '../services/ActorService';

function MinionRow(props: { row: Minion }) {
    const { row } = props;

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.combatRating}</TableCell>
                <TableCell>{row.socialRating}</TableCell>
                <TableCell>{row.generalRating}</TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function MinionTable() {
    const [minions, setMinions] = useState<Minion[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            const minionList = await ActorService.getMinions();
            if (!minionList) { return; }
            setMinions(minionList);
        })();
    });

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Combat Rating</TableCell>
                        <TableCell>Social Rating</TableCell>
                        <TableCell>General Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {minions.map((row: Minion) => (
                        <MinionRow key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
