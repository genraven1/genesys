import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import Ability from "../../../models/Ability";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../common/table/TypographyTableCell";
import Archetype from "../../../models/actor/player/Archetype";
import {renderHeaders, renderTableHeader} from "../../common/table/TableRenders";

interface Props {
    ability: Ability
}

function Row(props: Props): JSX.Element {
    const {ability} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={ability.name}/>
            <GenesysDescriptionTypographyCenterTableCell value={ability.description}/>
        </TableRow>
    )
}

interface TableProps {
    archetype: Archetype
}

export default function ViewAbilityTable(props: TableProps) {
    const {archetype} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderTableHeader('Abilities', 2)}
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {(archetype?.abilities!! || []).map((row: Ability) => (
                        <Row key={row.name} ability={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}