import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import {ActorTalent} from "../../../../models/actor/Actor";
import GenesysTalentTypography from "../../../common/typography/GenesysTalentTypography";
import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";

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
    npc: NonPlayerCharacter
}

export default function NonPlayerCharacterTalentTable(props: TableProps) {
    const {npc} = props

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>Talents</TableCell>
                    </TableRow>
                    <TableRow>
                        <TypographyCenterTableCell value={"Name"}/>
                        <TypographyCenterTableCell value={"Summary"}/>
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