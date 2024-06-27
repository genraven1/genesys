import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {EquipmentQuality} from "../../../models/Quality";
import {Weapon} from "../../../models/equipment/Weapon";
import {
    GenesysDescriptionTypographyCenterTableCell,
    TypographyCenterTableCell
} from "../../common/table/TypographyTableCell";
import {renderDoubleRowTableHeader} from "../../common/table/TableRenders";

interface Props {
    quality: EquipmentQuality
}

function Row(props: Props): JSX.Element {
    const {quality} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={quality.name}/>
            <GenesysDescriptionTypographyCenterTableCell value={String(quality.ranks)}/>
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
                {renderDoubleRowTableHeader(headers, 'Weapon Special Qualities')}
                <TableBody>
                    {(weapon.qualities || []).map((quality: EquipmentQuality) => (
                        <Row key={quality.name} quality={quality}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}