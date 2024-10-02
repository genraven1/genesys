import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {ActorArmor} from "../../../../../models/equipment/Armor";
import {renderQualities, renderSoak} from "../../../../../models/equipment/EquipmentHelper";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {Fragment} from "react";

interface Props {
    armor: ActorArmor[]
}

export default function ViewNonPlayerCharacterArmorTable(props: Props) {
    const {armor} = props
    const headers = ['Name', 'Defense', 'Soak', 'Special Qualities']

    const renderTableBody = () => {
        if (!armor) {
            return <Fragment/>
        } else {
            return (
                <TableBody>
                    {armor.map((armor: ActorArmor) => (
                        <TableRow key={armor.id}>
                            <TypographyLeftTableCell value={armor?.name!!}/>
                            <TypographyCenterTableCell value={String(armor?.defense!!)}/>
                            <TypographyCenterTableCell value={renderSoak(armor)}/>
                            <TypographyCenterTableCell value={renderQualities(armor!!)}/>
                        </TableRow>
                    ))}
                </TableBody>
            )

        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                {renderTableBody()}
            </Table>
        </TableContainer>
    )
}