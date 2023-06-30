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
import NonPlayerCharacter from "../../../../models/actor/npc/NonPlayerCharacter";
import NonPlayerCharacterEditSkillDialog from "./NonPlayerCharacterEditSkillDialog";
import {ActorSkill, ActorType, getCharacteristicRanks, setSkillName} from "../../../../models/actor/Actor";
import {renderHeaders} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import Minion from "../../../../models/actor/npc/Minion";
import CheckboxTableCell from "../../../common/table/CheckboxTableCell";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import ActorService from "../../../../services/ActorService";

interface GroupSkillRowProps {
    skill: ActorSkill
    minion: Minion
}

function GroupSkillRow(props: GroupSkillRowProps) {
    const {skill, minion} = props

    const onSettingAddition = async (skill: string) => {
        const copyMinion = {...minion} as Minion
        copyMinion.group = copyMinion.group.concat(skill)
        await ActorService.updateMinion(minion?.name!!, minion)
    }

    const onSettingRemoval = async (skill: string) => {
        const copyMinion = {...minion} as Minion
        copyMinion.group.forEach((name, index) => {
            if (name === skill) {
                copyMinion.group.splice(index, 1)
            }
        })
        await ActorService.updateMinion(minion?.name!!, minion)
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={skill.name}/>
            <CheckboxTableCell value={minion?.group!!.includes(skill.name)}
                               onAddition={() => onSettingAddition(skill.name)}
                               onRemoval={() => onSettingRemoval(skill.name)}/>
        </TableRow>
    )
}

interface RowProps {
    skill: ActorSkill
    npc: NonPlayerCharacter
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
                                                                           actorSkill={skill!!} name={npc.name}
                                                                           type={npc.type}/>}
            </TableCell>
        </TableRow>
    )
}

interface GroupProps {
    npc: NonPlayerCharacter
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {npc, type} = props
    const [open, setOpen] = useState(false)

    const renderTableHeaders = (): JSX.Element => {
        if (npc?.type!! === ActorType.Minion) {
            return renderHeaders(['Name', 'Group Skill'])
        }
        return renderHeaders(['Name', 'Ranks', 'Dice Pool', 'Edit'])
    }

    const renderSkillRow = (skill: ActorSkill, npc: NonPlayerCharacter): JSX.Element => {
        if (npc?.type!! === ActorType.Minion) {
            return <GroupSkillRow skill={skill} minion={npc as Minion}/>
        }
        return <SkillRow skill={skill} npc={npc}/>
    }

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
                                    {renderTableHeaders()}
                                </TableHead>
                                <TableBody>
                                    {(npc?.skills!! || []).filter((skill) => skill.type === type)
                                        .map((skill: ActorSkill) => (
                                        renderSkillRow(skill, npc)
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
    npc: NonPlayerCharacter
}

export default function NonPlayerCharacterSkillTable(props: TableProps) {
    const {npc} = props
    const headers = ['Skills']

    const renderTableBody = () => {
        return (
            <TableBody>
                <SkillTypeGroup npc={npc!!} type={SkillType.General}/>
                <SkillTypeGroup npc={npc!!} type={SkillType.Magic}/>
                <SkillTypeGroup npc={npc!!} type={SkillType.Combat}/>
                <SkillTypeGroup npc={npc!!} type={SkillType.Social}/>
                <SkillTypeGroup npc={npc!!} type={SkillType.Knowledge}/>
            </TableBody>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    {renderHeaders(headers)}
                </TableHead>
                {renderTableBody()}
            </Table>
        </TableContainer>
    )
}