import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import * as React from 'react';
import ActorService from '../../../../services/ActorService'
import Rival from "../../../../models/actor/npc/Rival";
import ActionsTableCell from "../../../common/table/ActionsTableCell";
import {ActorPath} from "../../../../services/Path";

function Row(props: { row: Rival }): JSX.Element {
    const { row } = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <ActionsTableCell id={String(row.id)} path={ActorPath.Rival}/>
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
    )
}

export default function AllRivalsView() {
    const [rivals, setRivals] = useState<Rival[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const rivalList = await ActorService.getRivals()
            if (!rivalList) { return }
            setRivals(rivalList)
        })()
    }, [])

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
    )
}