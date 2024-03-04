import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Box} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {SkillType} from "../../../../models/actor/Skill";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import Minion, {GroupSkill} from "../../../../models/actor/npc/Minion";
import CheckboxTableCell from "../../../common/table/CheckboxTableCell";
import ActorService from "../../../../services/ActorService";

interface GroupSkillRowProps {
    skill: GroupSkill
    minion: Minion
}

function GroupSkillRow(props: GroupSkillRowProps) {
    const {skill, minion} = props
    const [groupSkill, setGroupSkill] = useState(skill)
    const [min, setMin] = useState(minion)

    const onSkillAddition = async (skill: GroupSkill) => {
        skill.group = true
        setGroupSkill(skill)
        setMin(await ActorService.updateMinionSkill(minion.name, groupSkill))
    }

    const onSkillRemoval = async (skill: GroupSkill) => {
        skill.group = false
        setGroupSkill(skill)
        setMin(await ActorService.updateMinionSkill(minion.name, groupSkill))
    }

    return (
        <TableRow key={skill.name}>
            <TypographyCenterTableCell value={skill.name}/>
            <CheckboxTableCell value={groupSkill.group}
                               onAddition={() => onSkillAddition(groupSkill)}
                               onRemoval={() => onSkillRemoval(groupSkill)}/>
        </TableRow>
    )
}

interface GroupProps {
    minion: Minion
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {minion, type} = props
    const [open, setOpen] = useState(false)
    const headers = ['Name', 'Group Skill']

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={type}/>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table>
                                {renderSingleRowTableHeader(headers)}
                                <TableBody>
                                    {(minion?.skills!! || [])
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .filter((skill) => skill.type === type)
                                        .map((skill: GroupSkill) => (
                                            <GroupSkillRow skill={skill} minion={minion}/>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

interface TableProps {
    minion: Minion
}

export default function EditMinionSkillTable(props: TableProps) {
    const {minion} = props
    const headers = ['Skills']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    <SkillTypeGroup minion={minion!!} type={SkillType.General}/>
                    <SkillTypeGroup minion={minion!!} type={SkillType.Magic}/>
                    <SkillTypeGroup minion={minion!!} type={SkillType.Combat}/>
                    <SkillTypeGroup minion={minion!!} type={SkillType.Social}/>
                    <SkillTypeGroup minion={minion!!} type={SkillType.Knowledge}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}