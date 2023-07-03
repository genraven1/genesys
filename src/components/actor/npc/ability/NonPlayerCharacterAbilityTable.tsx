import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../../common/table/TypographyTableCell";
import Ability from "../../../../models/Ability";

interface Props {
    row: Ability
}

function Row(props: Props): JSX.Element {
    const {row} = props

    const renderDescriptionCell = (): JSX.Element => {
        return <GenesysDescriptionTypographyCenterTableCell value={row.description}/>
    }

    return (
        <TableRow>
            <TableCell>{row.name}</TableCell>
            {renderDescriptionCell()}
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
            <Table>
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