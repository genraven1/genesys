import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../../common/card/CenteredCardHeader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {SkillType} from "../../../../models/actor/Skill";
import * as React from "react";
import {renderDoubleRowTableHeader, renderSkillName} from "../../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import {GenesysDicePoolCenterTableCell, TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import BooleanTableCell from "../../../common/table/BooleanTableCell";

interface GroupProps {
    player: Player
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {player, type} = props;
    let headers = ['Skill', 'Career', 'Ranks', 'Dice Pool'];

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, type, 3)}
            <TableBody>
                {(player.skills || []).filter((skill) => skill.type === type).map((skill: PlayerSkill) => (
                    <TableRow key={skill.name}>
                        {renderSkillName(skill)}
                        <BooleanTableCell bool={skill.career}/>
                        <TypographyCenterTableCell value={String(skill.ranks)}/>
                        <GenesysDicePoolCenterTableCell actor={player} skill={skill}/>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

interface Props {
    player: Player
}

export default function PlayerSkillCard(props: Props) {
    const {player} = props;

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
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
            </CardContent>
        </Card>
    );
}