import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {ActorArmor} from "../../../../../models/equipment/Armor";
import {renderQualities, renderSoak} from "../../../../../models/equipment/EquipmentHelper";
import {renderHeaders} from "../../../../common/table/TableRenders";

interface Props {
    armor: ActorArmor[]
}

export default function ViewNonPlayerCharacterArmorTable(props: Props) {
    const {armor} = props
    const headers = ['Name', 'Defense', 'Soak', 'Special Qualities']

    const renderTableBody = () => {
        if (!armor) {
            return
        } else {
            return armor.map((weapon: ActorArmor) => (
                <Row key={weapon.name} armor={weapon}/>
            ))
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderHeaders(headers)}
                <TableBody>
                    {renderTableBody()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface RowProps {
    armor: ActorArmor
}

function Row(props: RowProps) {
    const {armor} = props

    return (
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TypographyLeftTableCell value={armor.name}/>
            <TypographyCenterTableCell value={String(armor.defense)}/>
            <TypographyCenterTableCell value={renderSoak(armor)}/>
            <TypographyCenterTableCell value={renderQualities(armor.qualities)}/>
        </TableRow>
    )
}