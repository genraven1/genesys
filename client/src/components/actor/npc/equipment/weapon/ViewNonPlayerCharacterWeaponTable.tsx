import {ActorWeapon} from "../../../../../models/equipment/Weapon";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {useState} from "react";
import {
    GenesysDicePoolCenterTableCell,
    TypographyCenterTableCell,
    TypographyLeftTableCell
} from "../../../../common/table/TypographyTableCell";
import {renderActorDamage, renderQualities,} from "../../../../../models/equipment/EquipmentHelper";
import {renderHeaders} from "../../../../common/table/TableRenders";
import NonPlayerCharacter from "../../../../../models/actor/npc/NonPlayerCharacter";
import {ActorSkill} from "../../../../../models/actor/Actor";

interface Props {
    weapons: ActorWeapon[]
    npc: NonPlayerCharacter
}

export default function ViewNonPlayerCharacterWeaponTable(props: Props): JSX.Element {
    const {weapons, npc} = props
    const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Special Qualities', 'Dice Pool']

    const renderTableBody = () => {
        if (!weapons) {
            return
        } else {
            return weapons.map((weapon: ActorWeapon) => (
                <Row key={weapon.name} weapon={weapon} npc={npc}/>
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
    npc: NonPlayerCharacter
}

function Row(props: RowProps): JSX.Element {
    const {weapon, npc} = props
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
        for (let skill of npc.skills) {
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
            <TypographyCenterTableCell value={renderActorDamage(weapon, npc.brawn.current)}/>
            <TypographyCenterTableCell value={String(weapon.critical)}/>
            <TypographyCenterTableCell value={weapon.range}/>
            <TypographyCenterTableCell value={renderQualities(weapon!!)}/>
            <GenesysDicePoolCenterTableCell actor={npc} skill={getActorSkill()}/>
        </TableRow>
    )
}