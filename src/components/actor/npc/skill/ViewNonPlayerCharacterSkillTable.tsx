import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import GenesysSkillDiceTypography from "../../../common/typography/GenesysSkillDiceTypography";
import {SkillType} from "../../../../models/actor/Skill";
import {ActorSkill, ActorType} from "../../../../models/actor/Actor";
import Minion from "../../../../models/actor/npc/Minion";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderHeaders} from "../../../common/table/TableRenders";

const setSkillName = (skill: ActorSkill): string => {
    return skill.name + '(' + skill.characteristic + ')'
}

interface GroupProps {
    npc: NonPlayerCharacter,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {npc, type} = props
    const headers = ['Name', 'Dice Pool']

    const getCharacteristicRanks = (skill: ActorSkill): number => {
        switch (skill.characteristic) {
            case CharacteristicType.Agility:
                return npc.agility.current
            case CharacteristicType.Brawn:
                return npc.brawn.current
            case CharacteristicType.Cunning:
                return npc.cunning.current
            case CharacteristicType.Intellect:
                return npc.intellect.current
            case CharacteristicType.Presence:
                return npc.presence.current
            case CharacteristicType.Willpower:
                return npc.willpower.current
        }
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2} style={{textAlign: "center"}}>{type}</TableCell>
                </TableRow>
                {renderHeaders(headers)}
            </TableHead>
            <TableBody>
                {(npc?.skills!! || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: ActorSkill) => (
                        <TableRow>
                            <TypographyCenterTableCell value={setSkillName(actorSkill)}/>
                            <TableCell style={{textAlign: 'center'}}>
                                <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(actorSkill)}
                                                            skillRanks={actorSkill.ranks}/>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    npc: NonPlayerCharacter
}

export default function ViewNonPlayerCharacterSkillTable(props: TableProps) {
    const {npc} = props

    const renderSkillGroup = (type: SkillType):JSX.Element => {
        if (npc?.type!! === ActorType.Minion) {
            return <MinionSkillGroupTable minion={npc as Minion} type={type}/>
        }
        return <SkillTypeGroup npc={npc} type={type}/>
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {renderSkillGroup(SkillType.General)}
                            {renderSkillGroup(SkillType.Magic)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {renderSkillGroup(SkillType.Combat)}
                            {renderSkillGroup(SkillType.Social)}
                            {renderSkillGroup(SkillType.Knowledge)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

interface SkillGroupProps {
    minion: Minion
    type: SkillType
}

export function MinionSkillGroupTable(props: SkillGroupProps) {
    const {minion, type} = props
    const headers = ['Name', 'Group Skill']

    const renderGroupTableCell = (skill: ActorSkill): JSX.Element => {
        let text = 'No'
        if (minion.group.includes(skill.name)) {
            text = 'Yes'
        }
        return <TypographyCenterTableCell value={text}/>
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2} style={{textAlign: "center"}}>{type}</TableCell>
                </TableRow>
                {renderHeaders(headers)}
            </TableHead>
            <TableBody>
                {(minion?.skills!! || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: ActorSkill) => (
                        <TableRow>
                            <TypographyCenterTableCell value={setSkillName(actorSkill)}/>
                            {renderGroupTableCell(actorSkill)}
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}