import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import NonPlayerActor from "../../../../models/actor/npc/NonPlayerActor";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyLeftTableCell
} from "../../../common/table/TypographyTableCell";
import Ability from "../../../../models/Ability";
import {renderDoubleRowTableHeader} from "../../../common/table/TableRenders";

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
    npc: NonPlayerActor
}

export default function NonPlayerCharacterAbilityTable(props: TableProps) {
    const {npc} = props
    const headers = ['Name', 'Summary']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderDoubleRowTableHeader(headers, 'Abilities', headers.length)}
                <TableBody>
                    {(npc?.abilities!! || []).map((ability: Ability) => (
                        <Row key={ability.name} ability={ability}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}