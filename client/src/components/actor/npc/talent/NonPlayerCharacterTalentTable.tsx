import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import GenesysTalentTypography from "../../../common/typography/GenesysTalentTypography";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerCharacter";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import {renderHeaders} from "../../../common/table/TableRenders";
import {ActorTalent} from "../../../../models/Talent";

interface Props {
    row: ActorTalent
    skillRanks?: number
}

function Row(props: Props): JSX.Element {
    const {row, skillRanks} = props

    const renderTypography = (): JSX.Element => {
        if (row.ranks === 0 || row.ranks === undefined) {
            return <GenesysDescriptionTypography text={row.summary}/>
        } else {
            return <GenesysTalentTypography text={row.summary} ranks={row.ranks} secondRanks={skillRanks}/>
        }
    }

    return (
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell>
                {renderTypography()}
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    npc: SingleNonPlayerCharacter
}

export default function NonPlayerCharacterTalentTable(props: TableProps) {
    const {npc} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>Talents</TableCell>
                    </TableRow>
                    <TableRow>
                        {renderHeaders(headers)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(npc?.talents!! || []).map((row: ActorTalent) => (
                        <Row key={row.name} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}