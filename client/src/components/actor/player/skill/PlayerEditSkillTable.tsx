import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {Box} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Player, {PlayerSkill} from "../../../../models/actor/player/Player";
import {SkillType} from "../../../../models/actor/Skill";
import {
    GenesysDicePoolCenterTableCellButton,
    TypographyLeftTableCell
} from "../../../common/table/TypographyTableCell";
import {renderBooleanTableCell, renderSingleRowTableHeader, renderSkillName} from "../../../common/table/TableRenders";
import PlayerSkillRankTableCell from "../../../common/table/PlayerSkillRankTableCell";

interface RowProps {
    skill: PlayerSkill
    player: Player
    onSkillChange: (skill: PlayerSkill) => void
}

function SkillRow(props: RowProps): JSX.Element {
    const {skill, player, onSkillChange} = props

    return (
        <TableRow key={skill.name}>
            {renderSkillName(skill)}
            {renderBooleanTableCell(skill.career)}
            <TypographyLeftTableCell value={String(skill.ranks)}/>
            <GenesysDicePoolCenterTableCellButton actor={player} skill={skill}/>
            <PlayerSkillRankTableCell skill={skill} onSkillChange={onSkillChange} disabled={false}/>
        </TableRow>
    )
}

interface GroupProps {
    player: Player
    type: SkillType
    onSkillChange: (skill: PlayerSkill) => void
}

export function SkillTypeGroup(props: GroupProps) {
    const {player, type, onSkillChange} = props
    const [open, setOpen] = useState(false)
    const headers = ['Name', 'Career', 'Ranks', 'Dice Pool', 'View']

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TableCell style={{textAlign: 'center'}}>{type}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Table>
                                {renderSingleRowTableHeader(headers)}
                                <TableBody>
                                    {(player.skills).filter((skill) => skill.type === type).map((skill: PlayerSkill) => (
                                        <SkillRow key={skill.name} skill={skill} player={player}
                                                  onSkillChange={onSkillChange}/>
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
    player: Player
    onSkillChange: (skill: PlayerSkill) => void
}

export default function PlayerEditSkillTable(props: TableProps) {
    const {player, onSkillChange} = props
    const headers = ['Skills']

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    <SkillTypeGroup player={player} type={SkillType.General} onSkillChange={onSkillChange}/>
                    <SkillTypeGroup player={player} type={SkillType.Magic} onSkillChange={onSkillChange}/>
                    <SkillTypeGroup player={player} type={SkillType.Combat} onSkillChange={onSkillChange}/>
                    <SkillTypeGroup player={player} type={SkillType.Social} onSkillChange={onSkillChange}/>
                    <SkillTypeGroup player={player} type={SkillType.Knowledge} onSkillChange={onSkillChange}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}