import {Link, LinkProps, useLocation} from "react-router-dom";
import {forwardRef, Fragment, useMemo, useState} from "react";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import GenesysTypography from "../../../common/GenesysTypography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import {ActorTalent} from "../../../../models/actor/Actor";
import Nemesis from "../../../../models/actor/npc/Nemesis";

function Row(props: { row: ActorTalent }): JSX.Element {
    const { row } = props;

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>
                    <GenesysTypography text={row.summary}/>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

interface TableProps {
    nemesis: Nemesis
}

export default function NemesisTalentTable(props: TableProps) {
    const {nemesis} = props;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign: "center"}}>Talents</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Summary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nemesis.talents.map((row: ActorTalent) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}