import {ActorWeapon} from "../../../../../models/equipment/Weapon";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useState} from "react";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../../common/table/TypographyTableCell";
import {renderActorDamage, renderWeaponQualities} from "../../../../../models/equipment/EquipmentHelper";
import {renderHeaders} from "../../../../common/table/TableRenders";

interface Props {
    weapons: ActorWeapon[]
    brawn: number
}

export default function ViewActorWeaponTable(props: Props): JSX.Element {
    const {weapons, brawn} = props
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Special Qualities']

    const renderTableBody = () => {
        if (!weapons) {
            return
        } else {
            return weapons.map((weapon: ActorWeapon) => (
                <Row key={weapon.name} weapon={weapon} brawn={brawn}/>
            ))
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    {renderTableBody()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface RowProps {
    weapon: ActorWeapon
    brawn: number
}

function Row(props: RowProps): JSX.Element {
    const {weapon, brawn} = props
    const [open, setOpen] = useState(false)

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
            <TypographyLeftTableCell value={weapon.name}/>
            {/*<TypographyCenterTableCell value={renderEquipped()}/>*/}
            <TypographyCenterTableCell value={weapon.skill.name}/>
            <TypographyCenterTableCell value={renderActorDamage(weapon, brawn)}/>
            <TypographyCenterTableCell value={String(weapon.critical)}/>
            <TypographyCenterTableCell value={weapon.range}/>
            <TypographyCenterTableCell value={renderWeaponQualities(weapon)}/>
        </TableRow>
    )
}