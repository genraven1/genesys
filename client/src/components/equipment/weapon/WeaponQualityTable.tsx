import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import {EquipmentQuality} from "../../../models/Quality";
import {Weapon} from "../../../models/equipment/Weapon";
import {renderHeaders} from "../../common/table/TableRenders";
import {GenesysDescriptionTypographyCenterTableCell} from "../../common/table/TypographyTableCell";

interface Props {
    row: EquipmentQuality
}

function Row(props: Props): JSX.Element {
    const {row} = props

    return (
        <TableRow>
            <GenesysDescriptionTypographyCenterTableCell value={row.name}/>
            <GenesysDescriptionTypographyCenterTableCell value={String(row.ranks)}/>
        </TableRow>
    )
}

interface TableProps {
    weapon: Weapon
}

export default function WeaponQualityTable(props: TableProps) {
    const {weapon} = props
    const headers = ['Name', 'Ranks']

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {(weapon?.qualities!! || []).map((row: EquipmentQuality) => (
                        <Row key={row.name} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}