import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import {renderDoubleRowTableHeader} from "../../../../common/table/TableRenders";
import {SkillType} from "../../../../../models/actor/Skill";
import {ActorSkill, getCharacteristicRanks} from "../../../../../models/actor/Actor";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import GenesysSkillDiceTypography from "../../../../common/typography/GenesysSkillDiceTypography";
import {renderSkillName} from "../../../../common/skill/SkillRenders";

interface GroupProps {
    nemesis: Nemesis,
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {nemesis, type} = props
    const headers = ['Name', 'Dice Pool']

    return (
        <Table>
            {renderDoubleRowTableHeader(headers, type)}
            <TableBody>
                {(nemesis.skills || [])
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .filter((skill) => skill.type === type)
                    .map((actorSkill: ActorSkill) => (
                        <TableRow>
                            <TypographyCenterTableCell value={renderSkillName(actorSkill)}/>
                            <TableCell style={{textAlign: 'center'}}>
                                <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(nemesis, actorSkill)}
                                                             skillRanks={actorSkill.ranks}/>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

interface TableProps {
    nemesis: Nemesis
}

export default function ViewNemesisSkillTable(props: TableProps) {
    const {nemesis} = props

    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.General}/>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Magic}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Combat}/>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Social}/>
                            <SkillTypeGroup nemesis={nemesis} type={SkillType.Knowledge}/>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}