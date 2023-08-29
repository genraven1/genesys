import * as React from "react";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import {SkillType} from "../../../../models/actor/Skill";
import {
    GenesysDescriptionTypographyCenterTableCell,
    GenesysDicePoolCenterTableCell, TypographyCenterTableCell
} from "../../../common/table/TypographyTableCell";

interface RowProps {
    skill: PlayerSkill
    player: Player
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, player} = props;

    const setName = (): string => {
        return skill.name + '(' + skill.characteristic + ')'
    }

    return (
        <TableRow>
            <GenesysDescriptionTypographyCenterTableCell value={setName()}/>
            <GenesysDicePoolCenterTableCell actor={player} skill={skill}/>
        </TableRow>
    )
}

interface GroupProps {
    player: Player
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {player, type} = props

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TypographyCenterTableCell value={type} span={2}/>
                </TableRow>
            </TableHead>
            <TableBody>
                {(player?.skills!! || []).filter((skill) => skill.type === type).map((row: PlayerSkill) => (
                    <SkillRow key={row.name} skill={row} player={player}/>
                ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    player: Player
}

export default function ViewPlayerSkillTable(props: TableProps) {
    const {player} = props
    return (
            <Grid container>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <SkillTypeGroup player={player} type={SkillType.General}/>
                                <SkillTypeGroup player={player} type={SkillType.Magic}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <SkillTypeGroup player={player} type={SkillType.Combat}/>
                                <SkillTypeGroup player={player} type={SkillType.Social}/>
                                <SkillTypeGroup player={player} type={SkillType.Knowledge}/>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
    )
}