import * as React from "react";
import {Fragment} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Grid, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import NonPlayerCharacter, { NonPlayerCharacterSkill } from "../../../models/actor/npc/NonPlayerCharacter";
import { CharacteristicType } from "../../../models/actor/Characteristics";
import GenesysSkillDiceTypography from "../../common/GenesysSkillDiceTypography";
import { SkillType } from "../../../models/actor/Skill";

interface RowProps {
    skill: NonPlayerCharacterSkill,
    npc: NonPlayerCharacter
}

function SkillRow(props: RowProps): JSX.Element {
    const { skill, npc } = props

    const setName = (): string => {
        return skill.name + '(' + skill.characteristic + ')'
    }

    const getCharacteristicRanks = (): number => {
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
        <Fragment>
            <TableRow>
                <TableCell>{setName()}</TableCell>
                <TableCell>
                    <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks()} skillRanks={skill.ranks} />
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

interface GroupProps {
    npc: NonPlayerCharacter,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {npc, type} = props

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2} style={{textAlign: "center"}}>{type}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(npc?.skills!! || []).filter((skill) => skill.type === type).map((row: NonPlayerCharacterSkill) => (
                            <SkillRow key={row.name} skill={row} npc={npc}/>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    )
}

interface TableProps {
    npc: NonPlayerCharacter
}

export default function ViewNonPlayerCharacterSkillTable(props: TableProps) {
    const {npc} = props;
    return (
        <Fragment>
            <Typography>{'Skills'}</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                <SkillTypeGroup npc={npc} type={SkillType.General}/>
                                <SkillTypeGroup npc={npc} type={SkillType.Magic}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                <SkillTypeGroup npc={npc} type={SkillType.Combat}/>
                                <SkillTypeGroup npc={npc} type={SkillType.Social}/>
                                <SkillTypeGroup npc={npc} type={SkillType.Knowledge}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Fragment>
    )
}