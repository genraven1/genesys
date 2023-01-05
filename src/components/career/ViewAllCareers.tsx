import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import * as React from 'react';
import ActionsTableCell from "../common/ActionsTableCell";
import Career from "../../models/actor/player/Career";
import CareerService from "../../services/CareerService";

function Row(props: { row: Career }): JSX.Element {
    const {row} = props

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <ActionsTableCell name={row.name}/>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllCareers() {
    const [careers, setCareers] = useState<Career[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            const careerList = await CareerService.getCareers()
            if (!careerList) { return }
            setCareers(careerList)
        })()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Career Name</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {careers.map((row: Career) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}