import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Box, Button} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {SkillType} from "../../../../../models/actor/Skill";
import GenesysSkillDiceTypography from "../../../../common/typography/GenesysSkillDiceTypography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import NonPlayerCharacterEditSkillDialog from "./RivalEditSkillDialog";
import {ActorSkill, getCharacteristicRanks, setSkillName} from "../../../../../models/actor/Actor";
import {renderHeaders, renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
import Rival from "../../../../../models/actor/npc/Rival";

interface RowProps {
    skill: ActorSkill
    rival: Rival
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, rival} = props
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false)

    return (
        <TableRow>
            <TypographyCenterTableCell value={setSkillName(skill)}/>
            <TypographyCenterTableCell value={String(skill.ranks)}/>
            <TableCell>
                <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(rival, skill)}
                                            skillRanks={skill.ranks}/>
            </TableCell>
            <TableCell>
                <Button onClick={(): void => setOpenEditSkillDialog(true)}>Edit</Button>
                {openEditSkillDialog && <NonPlayerCharacterEditSkillDialog open={openEditSkillDialog}
                                                                           onClose={(): void => setOpenEditSkillDialog(false)}
                                                                           actorSkill={skill} rival={rival}/>}
            </TableCell>
        </TableRow>
    )
}

interface GroupProps {
    rival: Rival
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {rival, type} = props
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
                                <TableHead>
                                    {renderHeaders(headers)}
                                </TableHead>
                                <TableBody>
                                    {(rival.skills || [])
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .filter((skill) => skill.type === type)
                                        .map((skill: ActorSkill) => (
                                            <SkillRow skill={skill} rival={rival}/>
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
    rival: Rival
}

export default function RivalSkillTable(props: TableProps) {
    const {rival} = props
    const headers = ['Skills']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    <SkillTypeGroup rival={rival} type={SkillType.General}/>
                    <SkillTypeGroup rival={rival} type={SkillType.Magic}/>
                    <SkillTypeGroup rival={rival} type={SkillType.Combat}/>
                    <SkillTypeGroup rival={rival} type={SkillType.Social}/>
                    <SkillTypeGroup rival={rival} type={SkillType.Knowledge}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}