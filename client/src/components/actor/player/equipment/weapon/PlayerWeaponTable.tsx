import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useState} from "react";
import {ActorWeapon} from "../../../../../models/equipment/Weapon";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {
    GenesysDicePoolCenterTableCell,
    TypographyCenterTableCell,
    TypographyLeftTableCell
} from "../../../../common/table/TypographyTableCell";
import {renderActorDamage, renderQualities} from "../../../../../models/equipment/EquipmentHelper";
import Player from "../../../../../models/actor/player/Player";
import {ActorSkill} from "../../../../../models/actor/Actor";


interface Props {
    weapons: ActorWeapon[]
    player: Player
}

export default function PlayerWeaponTable(props: Props): JSX.Element {
    const {weapons, player} = props
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Special Qualities', 'Dice Pool']

    const renderTableBody = () => {
        if (!weapons) {
            return
        } else {
            return weapons.map((weapon: ActorWeapon) => (
                <Row key={weapon.name} weapon={weapon} player={player}/>
            ))
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {renderTableBody()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

interface RowProps {
    weapon: ActorWeapon
    player: Player
}

function Row(props: RowProps): JSX.Element {
    const {weapon, player} = props
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

    const getActorSkill = (): ActorSkill => {
        let actorSkill = {} as ActorSkill
        for (let skill of player.skills) {
            if (skill.name === weapon.skill.name) {
                actorSkill = skill as ActorSkill
            }
        }
        return actorSkill
    }

    return (
        <TableRow onClick={() => setOpen(!open)}>
            <TypographyLeftTableCell value={weapon.name}/>
            {/*<TypographyCenterTableCell value={renderEquipped()}/>*/}
            <TypographyCenterTableCell value={weapon.skill.name}/>
            <TypographyCenterTableCell value={renderActorDamage(weapon, player.brawn)}/>
            <TypographyCenterTableCell value={String(weapon.critical)}/>
            <TypographyCenterTableCell value={weapon.range}/>
            <TypographyCenterTableCell value={renderQualities(weapon!!)}/>
            <GenesysDicePoolCenterTableCell actor={player} skill={getActorSkill()}/>
        </TableRow>
    )
}