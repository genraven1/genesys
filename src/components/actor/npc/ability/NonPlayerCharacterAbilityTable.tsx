import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import Ability from "../../../../models/Ability";

interface Props {
    row: Ability
    skillRanks?: number
}

function Row(props: Props): JSX.Element {
    const {row, skillRanks} = props

    const renderTypography = (): JSX.Element => {
        return <GenesysDescriptionTypography text={row.description}/>
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

export default function NonPlayerCharacterAbilityTable(props: TableProps) {
    const {npc} = props

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>Abilities</TableCell>
                    </TableRow>
                    <TableRow>
                        <TypographyCenterTableCell value={"Name"}/>
                        <TypographyCenterTableCell value={"Summary"}/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(npc?.abilities!! || []).map((row: Ability) => (
                        <Row key={row.name} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}