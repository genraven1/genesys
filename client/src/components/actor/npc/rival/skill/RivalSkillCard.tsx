import {Card, CardContent, Grid} from "@mui/material";
import {useLocation} from "react-router-dom";
import CenteredCardHeader from "../../../../common/card/CenteredCardHeader";
import Rival from "../../../../../models/actor/npc/Rival";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {SkillType} from "../../../../../models/actor/Skill";
import * as React from "react";
import {renderDoubleRowTableHeader, renderSkillName} from "../../../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import {GenesysDicePoolCenterTableCell, TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import {ActorSkill} from "../../../../../models/actor/Actor";
import NumberTextFieldTableCell from "../../../../common/table/NumberTextFieldTableCell";


interface GroupProps {
    rival: Rival
    type: SkillType
}

function SkillTypeGroup(props: GroupProps) {
    const {rival, type} = props;
    let headers = ['Skill', 'Ranks', 'Dice Pool'];

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, type, 3)}
            <TableBody>
                {(rival.skills || []).filter((skill) => skill.type === type).map((skill: ActorSkill) => (
                    <TableRow key={skill.name}>
                        {renderSkillName(skill)}
                        <TypographyCenterTableCell value={String(skill.ranks)}/>
                        <GenesysDicePoolCenterTableCell actor={rival} skill={skill}/>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

interface Props {
    rival: Rival
}

export default function RivalSkillCard(props: Props): JSX.Element {
    const {rival} = props
    const pathname = useLocation().pathname

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Skills'}/>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <SkillTypeGroup rival={rival} type={SkillType.General}/>
                                    <SkillTypeGroup rival={rival} type={SkillType.Magic}/>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <SkillTypeGroup rival={rival} type={SkillType.Combat}/>
                                    <SkillTypeGroup rival={rival} type={SkillType.Social}/>
                                    <SkillTypeGroup rival={rival} type={SkillType.Knowledge}/>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}