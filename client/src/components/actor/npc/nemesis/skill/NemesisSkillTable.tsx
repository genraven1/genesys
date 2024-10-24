import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Box, Button} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import Nemesis from "../../../../../models/actor/npc/Nemesis";
import {ActorSkill, getCharacteristicRanks} from "../../../../../models/actor/Actor";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import GenesysSkillDiceTypography from "../../../../common/typography/GenesysSkillDiceTypography";
import NemesisEditSkillDialog from "./NemesisEditSkillDialog";
import {SkillType} from "../../../../../models/actor/Skill";
import {renderSkillName} from "../../../../common/skill/SkillRenders";

interface RowProps {
    skill: ActorSkill
    nemesis: Nemesis
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, nemesis} = props
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false)

    return (
        <TableRow>
            <TypographyCenterTableCell value={renderSkillName(skill)}/>
            <TypographyCenterTableCell value={String(skill?.ranks!!)}/>
            <TableCell>
                <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(nemesis, skill)}
                                            skillRanks={skill?.ranks!!}/>
            </TableCell>
            <TableCell>
                <Button onClick={(): void => setOpenEditSkillDialog(true)}>Edit</Button>
                {openEditSkillDialog && <NemesisEditSkillDialog open={openEditSkillDialog}
                                                                onClose={(): void => setOpenEditSkillDialog(false)}
                                                                actorSkill={skill} nemesis={nemesis}/>}
            </TableCell>
        </TableRow>
    )
}

interface GroupProps {
    nemesis: Nemesis
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {nemesis, type} = props
    const [open, setOpen] = useState(false)
    const headers = ['Name', 'Ranks', 'Dice Pool', 'Edit']

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
                                    {(nemesis.skills || [])
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .filter((skill) => skill.type === type)
                                        .map((skill: ActorSkill) => (
                                            <SkillRow skill={skill} nemesis={nemesis}/>
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
    nemesis: Nemesis
}

export default function NemesisSkillTable(props: TableProps) {
    const {nemesis} = props
    const headers = ['Skills']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.General}/>
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Magic}/>
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Combat}/>
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Social}/>
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Knowledge}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}