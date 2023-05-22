import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useState} from "react";
import {ActorWeapon} from "../../../../models/equipment/Weapon";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "../../../common/table/TypographyTableCell";

interface Props {
    weapons: ActorWeapon[]
    brawn: number
}

export default function ViewPlayerWeaponTable(props: Props): JSX.Element {
    const {weapons, brawn} = props

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
                    <TableRow>
                        <TypographyLeftTableCell value={'Name'}/>
                        <TypographyCenterTableCell value={'Skill'}/>
                        <TypographyCenterTableCell value={'Damage'}/>
                        <TypographyCenterTableCell value={'Critical'}/>
                        <TypographyCenterTableCell value={'Range'}/>
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
    weapon: ActorWeapon
    brawn: number
}

function Row(props: RowProps): JSX.Element {
    const {weapon, brawn} = props
    const [open, setOpen] = useState(false)

    const renderDamage = (): string => {
        let damage = ''
        if (weapon.brawn) {
            damage = String(weapon.damage + brawn)
        } else {
            damage = String(weapon.damage)
        }
        return damage
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
            <TypographyLeftTableCell value={weapon.name}/>
            {/*<TypographyCenterTableCell value={renderEquipped()}/>*/}
            <TypographyCenterTableCell value={weapon.skill.name}/>
            <TypographyCenterTableCell value={renderDamage()}/>
            <TypographyCenterTableCell value={String(weapon.critical)}/>
            <TypographyCenterTableCell value={weapon.range}/>
        </TableRow>
    )
}