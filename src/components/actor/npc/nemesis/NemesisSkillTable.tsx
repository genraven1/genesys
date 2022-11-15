import Nemesis from "../../../../models/actor/npc/Nemesis";
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
import GenesysSkillDiceTypography from "../../../common/GenesysSkillDiceTypography";
import {CharacteristicType} from "../../../../models/actor/Characteristics";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {NonPlayerCharacterSkill} from "../../../../models/actor/npc/NonPlayerCharacter";
import NemesisEditSkillDialog from "./NemesisEditSkillDialog";

interface RowProps {
    skill: NonPlayerCharacterSkill
    nemesis: Nemesis
}

function SkillRow(props: RowProps): JSX.Element {
    const { skill, nemesis } = props
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false)

    const setName = (): string => {
        return skill.name + '(' + skill.characteristic + ')'
    }

    const getCharacteristicRanks = (): number => {
        switch (skill.characteristic) {
            case CharacteristicType.Agility:
                return nemesis.agility.current
            case CharacteristicType.Brawn:
                return nemesis.brawn.current
            case CharacteristicType.Cunning:
                return nemesis.cunning.current
            case CharacteristicType.Intellect:
                return nemesis.intellect.current
            case CharacteristicType.Presence:
                return nemesis.presence.current
            case CharacteristicType.Willpower:
                return nemesis.willpower.current
        }
    }

    return (
        <Fragment>
            <TableRow>
                <TableCell>{setName()}</TableCell>
                <TableCell>{skill?.ranks!!}</TableCell>
                <TableCell>
                    <GenesysSkillDiceTypography characteristicRanks={getCharacteristicRanks()} skillRanks={skill?.ranks!!} />
                </TableCell>
                <TableCell>
                    <Button onClick={(): void => setOpenEditSkillDialog(true)}>Edit</Button>
                </TableCell>
            </TableRow>
            {openEditSkillDialog && <NemesisEditSkillDialog open={openEditSkillDialog} onClose={(): void => setOpenEditSkillDialog(false)}  actorSkill={skill!!} name={nemesis.name}/>}
        </Fragment>
    )
}

interface GroupProps {
    nemesis: Nemesis
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {nemesis, type} = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row" style={{ textAlign: 'center' }}>{type}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Skill</TableCell>
                                        <TableCell>Ranks</TableCell>
                                        <TableCell>Dice Pool</TableCell>
                                        <TableCell>Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(nemesis?.skills!! || []).filter((skill) => skill.type === type).map((row: NonPlayerCharacterSkill) => (
                                        <SkillRow key={row.name} skill={row} nemesis={nemesis}/>
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

export default function SkillTable(props: TableProps) {
    const {nemesis} = props
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign: "center"}}>Skills</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <SkillTypeGroup nemesis={nemesis!!} type={SkillType.General}/>
                    <SkillTypeGroup nemesis={nemesis!!} type={SkillType.Magic}/>
                    <SkillTypeGroup nemesis={nemesis!!} type={SkillType.Combat}/>
                    <SkillTypeGroup nemesis={nemesis!!} type={SkillType.Social}/>
                    <SkillTypeGroup nemesis={nemesis!!} type={SkillType.Knowledge}/>
                </TableBody>
            </Table>
        </TableContainer>
    )
}