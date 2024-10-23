import {ActorWeapon} from "../../../../../models/equipment/Weapon";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
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
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import NonPlayerActor, {SingleNonPlayerCharacter} from "../../../../../models/actor/npc/NonPlayerActor";
import {ActorSkill, ActorType} from "../../../../../models/actor/Actor";
import Minion from "../../../../../models/actor/npc/Minion";
import Skill from "../../../../../models/actor/Skill";

interface Props {
    weapons: ActorWeapon[]
    npc: NonPlayerActor
}

export default function ViewNonPlayerCharacterWeaponTable(props: Props) {
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
    npc: NonPlayerActor
}

function Row(props: RowProps) {
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
        switch (npc.type) {
            case ActorType.Minion:
                let minion = npc as Minion
                for (let skill of minion.skills) {
                    if (skill.name === weapon.skill.name) {
                        actorSkill = {...{...skill} as Skill, ranks: 0} as ActorSkill
                    }
                }
                break
            case ActorType.Rival:
            case ActorType.Nemesis:
                let single = npc as SingleNonPlayerCharacter
                for (let skill of single.skills) {
                    if (skill.name === weapon.skill.name) {
                        actorSkill = skill as ActorSkill
                    }
                }
                break
        }
        return actorSkill
    }

    return (
        <TableRow onClick={() => setOpen(!open)}>
            <TypographyLeftTableCell value={weapon.name}/>
            {/*<TypographyCenterTableCell value={renderEquipped()}/>*/}
            <TypographyCenterTableCell value={weapon.skill.name}/>
            <TypographyCenterTableCell value={renderActorDamage(weapon, npc.brawn)}/>
            <TypographyCenterTableCell value={String(weapon.critical)}/>
            <TypographyCenterTableCell value={weapon.range}/>
            <TypographyCenterTableCell value={renderQualities(weapon.qualities)}/>
            <GenesysDicePoolCenterTableCell actor={npc} skill={getActorSkill()}/>
        </TableRow>
    )
}