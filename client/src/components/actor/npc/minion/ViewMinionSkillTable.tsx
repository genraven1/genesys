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
import GenesysSkillDiceTypography from "../../../common/typography/GenesysSkillDiceTypography";
import {SkillType} from "../../../../models/actor/Skill";
import {ActorSkill, ActorType, getCharacteristicRanks, setSkillName} from "../../../../models/actor/Actor";
import Minion, {GroupSkill} from "../../../../models/actor/npc/Minion";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {renderHeaders} from "../../../common/table/TableRenders";

interface GroupProps {
    minion: Minion,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {minion, type} = props

    const renderSkillTableHeaders = ():JSX.Element => {
        return renderHeaders(['Name', 'Group Skill'])
    }

    const renderSkillRow = (skill: GroupSkill):JSX.Element => {
        let text = 'No'
        if (skill.group) {
            text = 'Yes'
        }
        return <TypographyCenterTableCell value={text}/>
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TypographyCenterTableCell value={type} span={2}/>
                </TableRow>
                {renderSkillTableHeaders}
            </TableHead>
            <TableBody>
                {(minion?.skills!! || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: GroupSkill) => (
                        <TableRow>
                            <TypographyCenterTableCell value={setSkillName(actorSkill)}/>
                            <TableCell style={{textAlign: 'center'}}>
                                {renderSkillRow(actorSkill)}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    minion: Minion
}

export default function ViewNonPlayerCharacterSkillTable(props: TableProps) {
    const {minion} = props

    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup minion={minion} type={SkillType.General}/>
                            <SkillTypeGroup minion={minion} type={SkillType.Magic}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup minion={minion} type={SkillType.Combat}/>
                            <SkillTypeGroup minion={minion} type={SkillType.Social}/>
                            <SkillTypeGroup minion={minion} type={SkillType.Knowledge}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}