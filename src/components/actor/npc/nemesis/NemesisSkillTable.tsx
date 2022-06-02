import Nemesis from "../../../../models/actor/npc/Nemesis";
import {Fragment} from "react";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {ActorSkill} from "../../../../models/actor/Actor";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {IconButton} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function SkillRow(props: { row: ActorSkill }): JSX.Element {
    const { row } = props;

    const setName = (): string => {
        return row.name + '(' + row.characteristic + ')'
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{setName()}</TableCell>
                <TableCell>{row.ranks}</TableCell>
                <TableCell>
                    <IconButton title='Increase' size='medium'>
                        <ArrowUpwardIcon color='primary' fontSize='medium' />
                    </IconButton>
                    <IconButton title='Decrease' size='medium'>
                        <ArrowDownwardIcon color='primary' fontSize='medium' />
                    </IconButton>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

interface Props {
    nemesis: Nemesis
}

export default function NemesisSkillTable(props: Props) {
    const {nemesis} = props;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Skill</TableCell>
                        <TableCell>Ranks</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nemesis.skills.map((row: ActorSkill) => (
                        <SkillRow key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}