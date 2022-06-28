import Nemesis from "../../../../models/actor/npc/Nemesis";
import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {ActorSkill} from "../../../../models/actor/Actor";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Box, Button} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {SkillType} from "../../../../models/actor/Skill";
import EditSkillDialog from "../../../skills/EditSkillDialog";

interface RowProps {
    skill: ActorSkill,
    nemesis: Nemesis
}

function SkillRow(props: RowProps): JSX.Element {
    const { skill, nemesis } = props;
    const [openEditSkillDialog, setOpenEditSkillDialog] = useState(false);

    const setName = (): string => {
        return skill.name + '(' + skill.characteristic + ')'
    }

    return (
        <Fragment>
            <TableRow>
                <TableCell>{setName()}</TableCell>
                <TableCell>{skill.ranks}</TableCell>
                <TableCell>DICE</TableCell>
                <TableCell>
                    <Button onClick={(): void => setOpenEditSkillDialog(true)}>Edit</Button>
                </TableCell>
            </TableRow>
            {openEditSkillDialog && <EditSkillDialog open={openEditSkillDialog} onClose={(): void => setOpenEditSkillDialog(false)}  actorSkill={skill} name={nemesis.name}/>}
        </Fragment>
    );
}

interface Props {
    nemesis: Nemesis,
    type: SkillType
}

export function SkillTypeGroup(props: Props) {
    const {nemesis, type} = props
    const [open, setOpen] = useState(false);

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
                                    {nemesis.skills.filter((skill) => skill.type === type).map((row: ActorSkill) => (
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