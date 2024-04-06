import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Archetype from "../../../models/actor/player/Archetype";
import Ability from "../../../models/Ability";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyLeftTableCell
} from "../../common/table/TypographyTableCell";
import {renderDoubleRowTableHeader} from "../../common/table/TableRenders";

interface Props {
    ability: Ability
}

function Row(props: Props): JSX.Element {
    const {ability} = props

    return (
        <TableRow>
            <TypographyLeftTableCell value={ability.name}/>
            <GenesysDescriptionTypographyCenterTableCell value={ability.description}/>
        </TableRow>
    )
}

interface TableProps {
    archetype: Archetype
}

export default function ArchetypeAbilityTable(props: TableProps) {
    const {archetype} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Abilities', headers.length)}
                <TableBody>
                    {(archetype?.abilities!! || []).map((ability: Ability) => (
                        <Row key={ability.name} ability={ability}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}