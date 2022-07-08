import {Fragment} from "react";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import {ActorTalent} from "../../../../models/actor/Actor";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import GenesysTalentTypography from "../../../common/GenesysTalentTypography";

interface Props {
    row: ActorTalent
    skillRanks?: number
}

function Row(props: Props): JSX.Element {
    const {row,skillRanks} = props;

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>
                    <GenesysTalentTypography text={row.summary} ranks={row.ranks} secondRanks={skillRanks}/>
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
                        <TableCell colSpan={2} style={{textAlign: "center"}}>Talents</TableCell>
                    </TableRow>
                </TableHead>
                <TableHead>
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