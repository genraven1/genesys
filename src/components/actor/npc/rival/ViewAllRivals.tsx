import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { forwardRef, Fragment, useEffect, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import * as React from 'react';
import { LinkProps, Link } from "react-router-dom";
import ActorService from '../../../../services/ActorService'
import Rival from "../../../../models/actor/npc/Rival";

function Row(props: { row: Rival }): JSX.Element {
    const { row } = props;
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false);

    const renderLink = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${pathname}/${row.name}`} ref={ref} {...itemProps} />
    )),[pathname, row.name]);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>
                    <Button component={renderLink}>Edit</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function AllRivalsView() {
    const [rivals, setRivals] = useState<Rival[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            const rivalList = await ActorService.getRivals();
            if (!rivalList) { return; }
            setRivals(rivalList);
        })();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rival Name</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rivals.map((row: Rival) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}