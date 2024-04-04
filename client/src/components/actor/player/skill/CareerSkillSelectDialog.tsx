import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import Skill from "../../../../models/actor/Skill";
import Player from "../../../../models/actor/player/Player";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import CheckboxTableCell from "../../../common/table/CheckboxTableCell";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import ActorService from "../../../../services/ActorService";

interface Props {
    open: boolean
    onClose: () => void
    player: Player
}

export default function CareerSkillSelectDialog(props: Props): JSX.Element {
    const {open, onClose, player} = props
    const [skills, setSkills] = useState<Skill[]>([])

    const onSkillAddition = (skill: Skill) => {
        setSkills(skills.concat(skill))
    }

    const onSkillRemoval = (skill: Skill) => {
        skills.forEach((sk, index) => {
            if (sk.name === skill.name) {
                setSkills(skills.splice(index, 1))
            }
        })
    }

    const handleSelection = async () => {
        player.skills.forEach((playerSkill, index) => {
            skills.forEach((skill: Skill) => {
                if (skill.name === playerSkill.name) {
                    playerSkill.ranks = 1
                    player.skills[index] = playerSkill
                }
            })
        })
        await ActorService.updatePlayer(player.name, player)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Career Skills</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {player.career.skills.map((skill: Skill) => (
                                <TableRow key={skill.name}>
                                    <TypographyCenterTableCell value={skill.name}/>
                                    <CheckboxTableCell value={skills.some(sk => sk.name === skill.name)}
                                                       onAddition={() => onSkillAddition(skill)}
                                                       onRemoval={() => onSkillRemoval(skill)}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleSelection}
                        disabled={skills.length !== 4}>SELECT</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}