import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Talent from '../models/Talent';

function Row(props: { row: Talent }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

return (
    <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell>{row.ranked}</TableCell>
            <TableCell>{row.activation}</TableCell>
            <TableCell>{row.tier}</TableCell>
            <TableCell>{row.id}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases">
                            <TableBody>
                                {row.description}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </React.Fragment>
);
}
