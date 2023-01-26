import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Box, Button} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {SkillType} from "../../../models/actor/Skill";
import GenesysSkillDiceTypography from "../../common/typography/GenesysSkillDiceTypography";
import {CharacteristicType} from "../../../models/actor/Characteristics";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import NonPlayerCharacter from "../../../models/actor/npc/NonPlayerCharacter";
import NonPlayerCharacterEditSkillDialog from "./NonPlayerCharacterEditSkillDialog";
import {ActorSkill} from "../../../models/actor/Actor";

interface RowProps {
    skill: ActorSkill
    npc: NonPlayerCharacter
}

function SkillRow(props: RowProps): JSX.Element {
    const { skill, npc } = props
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false)

    const setName = (): string => {
        return skill.name + '(' + skill.characteristic + ')'
    }

    const getCharacteristicRanks = (): number => {
        switch (skill.characteristic) {
            case CharacteristicType.Agility:
                return npc.agility.current
            case CharacteristicType.Brawn:
                return npc.brawn.current
            case CharacteristicType.Cunning:
                return npc.cunning.current
            case CharacteristicType.Intellect:
                return npc.intellect.current
            case CharacteristicType.Presence:
                return npc.presence.current
            case CharacteristicType.Willpower:
                return npc.willpower.current
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
            {openEditSkillDialog && <NonPlayerCharacterEditSkillDialog open={openEditSkillDialog} onClose={(): void => setOpenEditSkillDialog(false)} actorSkill={skill!!} name={npc.name}/>}
        </Fragment>
    )
}

interface GroupProps {
    npc: NonPlayerCharacter
    type: SkillType
}

export function SkillTypeGroup(props: GroupProps) {
    const {npc, type} = props
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
                                    {(npc?.skills!! || []).filter((skill) => skill.type === type).map((row: ActorSkill) => (
                                        <SkillRow key={row.name} skill={row} npc={npc}/>
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
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign: "center"}}>Skills</TableCell>
                    </TableRow>
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