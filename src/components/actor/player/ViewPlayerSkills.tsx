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
import Player, { PlayerSkill } from "../../../models/actor/player/Player";
import { SkillType } from "../../../models/actor/Skill";
import { CharacteristicType } from "../../../models/actor/Characteristics";
import GenesysSkillDiceTypography from "../../common/GenesysSkillDiceTypography";

interface RowProps {
    skill: PlayerSkill
    player: Player
}

function SkillRow(props: RowProps): JSX.Element {
    const { skill, player } = props;

    const setName = (): string => {
        return skill.name + '(' + skill.characteristic + ')'
    }

    const getCharacteristicRanks = (): number => {
        switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return player.agility.current
        case CharacteristicType.Brawn:
            return player.brawn.current
        case CharacteristicType.Cunning:
            return player.cunning.current
        case CharacteristicType.Intellect:
            return player.intellect.current
        case CharacteristicType.Presence:
            return player.presence.current
        case CharacteristicType.Willpower:
            return player.willpower.current
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
    player: Player
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {player, type} = props

    return (
            <Fragment>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} style={{textAlign: "center"}}>{type}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(player?.skills!! || []).filter((skill) => skill.type === type).map((row: PlayerSkill) => (
                                <SkillRow key={row.name} skill={row} player={player}/>
                                ))}
                    </TableBody>
                </Table>
            </Fragment>
            )
}

interface TableProps {
    player: Player
}

export default function ViewPlayerSkillTable(props: TableProps) {
    const {player} = props
    return (
            <Fragment>
                <Typography>{'Skills'}</Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableBody>
                                    <SkillTypeGroup player={player} type={SkillType.General}/>
                                    <SkillTypeGroup player={player} type={SkillType.Magic}/>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableBody>
                                    <SkillTypeGroup player={player} type={SkillType.Combat}/>
                                    <SkillTypeGroup player={player} type={SkillType.Social}/>
                                    <SkillTypeGroup player={player} type={SkillType.Knowledge}/>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Fragment>
            )
}