import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Box, Button} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {SkillType} from "../../../../models/actor/Skill";
import GenesysSkillDiceTypography from "../../../common/typography/GenesysSkillDiceTypography";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import NonPlayerCharacterEditSkillDialog from "./NonPlayerCharacterEditSkillDialog";
import {ActorSkill, getCharacteristicRanks, setSkillName} from "../../../../models/actor/Actor";
import {renderHeaders} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";

interface RowProps {
    skill: ActorSkill
    npc: SingleNonPlayerCharacter
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, npc} = props
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false)

    return (
        <TableRow>
            <TypographyCenterTableCell value={setSkillName(skill)}/>
            <TypographyCenterTableCell value={String(skill?.ranks!!)}/>
            <TableCell>
                <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks(npc, skill)}
                                            skillRanks={skill?.ranks!!}/>
            </TableCell>
            <TableCell>
                <Button onClick={(): void => setOpenEditSkillDialog(true)}>Edit</Button>
                {openEditSkillDialog && <NonPlayerCharacterEditSkillDialog open={openEditSkillDialog}
                                                                           onClose={(): void => setOpenEditSkillDialog(false)}
                                                                           actorSkill={skill!!} actor={npc}
                                                                           type={npc.type}/>}
            </TableCell>
        </TableRow>
    )
}

interface GroupProps {
    npc: SingleNonPlayerCharacter
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {npc, type} = props
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
                                    {(npc?.skills!! || [])
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .filter((skill) => skill.type === type)
                                        .map((skill: ActorSkill) => (
                                            <SkillRow skill={skill} npc={npc}/>
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
    npc: SingleNonPlayerCharacter
}

export default function NonPlayerCharacterSkillTable(props: TableProps) {
    const {npc} = props
    const headers = ['Skills']

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                <TableBody>
                    <SkillTypeGroup npc={npc!!} type={SkillType.General}/>
                    <SkillTypeGroup npc={npc!!} type={SkillType.Magic}/>
                    <SkillTypeGroup npc={npc!!} type={SkillType.Combat}/>
                    <SkillTypeGroup npc={npc!!} type={SkillType.Social}/>
                    <SkillTypeGroup npc={npc!!} type={SkillType.Knowledge}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}