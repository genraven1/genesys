import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useState} from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../common/table/TypographyTableCell";
import {ActorArmor} from "../../../../models/equipment/Armor";

interface Props {
    armor: ActorArmor[]
}

export default function ViewPlayerArmorTable(props: Props): JSX.Element {
    const {armor} = props

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
                <TableHead>
                    <TableRow>
                        <TypographyLeftTableCell value={'Name'}/>
                        <TypographyCenterTableCell value={'Defense'}/>
                        <TypographyCenterTableCell value={'Soak'}/>
                    </TableRow>
                </TableHead>
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

function Row(props: RowProps): JSX.Element {
    const {armor} = props
    const [open, setOpen] = useState(false)

    const renderSoak = (): string => {
        return '+' + String(armor.soak)
    }

    // const renderEquipped = (): string => {
    //     let equip = ''
    //     if (weapon.equipped) {
    //         equip = 'True'
    //     } else {
    //         equip = 'False'
    //     }
    //     return equip
    // }

    return (
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}} onClick={() => setOpen(!open)}>
            <TypographyLeftTableCell value={armor.name}/>
            <TypographyCenterTableCell value={String(armor.defense)}/>
            <TypographyCenterTableCell value={renderSoak()}/>
        </TableRow>
    )
}