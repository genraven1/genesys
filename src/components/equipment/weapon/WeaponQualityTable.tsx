import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import {EquipmentQuality} from "../../../models/Quality";
import {Weapon} from "../../../models/equipment/Weapon";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";

interface Props {
    row: EquipmentQuality
}

function Row(props: Props): JSX.Element {
    const {row} = props

    return (
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell component="th" scope="row">{row.name}</TableCell>
            <TableCell>
                <GenesysDescriptionTypography text={String(row.ranks)}/>
            </TableCell>
        </TableRow>
    )
}

interface TableProps {
    weapon: Weapon
}

export default function WeaponQualityTable(props: TableProps) {
    const {weapon} = props

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>Weapon Special Qualities</TableCell>
                    </TableRow>
                    <TableRow>
                        <TypographyCenterTableCell value={"Name"}/>
                        <TypographyCenterTableCell value={"Ranks"}/>
                    </TableRow>
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