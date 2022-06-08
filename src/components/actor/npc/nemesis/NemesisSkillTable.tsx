import Nemesis from "../../../../models/actor/npc/Nemesis";
import * as React from "react";
import {Fragment, useState} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {ActorSkill} from "../../../../models/actor/Actor";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Box, IconButton} from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Collapse from "@mui/material/Collapse";
import {SkillType} from "../../../../models/actor/Skill";

interface RowProps {
    actorSkill: ActorSkill,
    nemesisProp: Nemesis
}

function SkillRow(props: RowProps): JSX.Element {
    const { actorSkill, nemesisProp } = props;
    const [skill, setSkill] = useState<ActorSkill>(actorSkill)
    const [nemesis, setNemesis] = useState<Nemesis>(nemesisProp)
    const [disableIncrease, setDisableIncrease] = useState(false)
    const [disableDecrease, setDisableDecrease] = useState(false)

    const setName = (): string => {
        return actorSkill.name + '(' + actorSkill.characteristic + ')'
    }

    const setLimits = (): void => {
        if (actorSkill.ranks <= 0) {
            console.log('IF')
            actorSkill.ranks = 0
            setDisableDecrease(true)
        } else if (actorSkill.ranks >= 5) {
            console.log('IF ELSE')
            actorSkill.ranks = 5
            setDisableIncrease(true)
        }
        else {
            console.log('ELSE')
            setDisableIncrease(false)
            setDisableDecrease(false)
        }
    }

    const increaseSkillRank = (): void => {
        console.log(skill)
        setSkill((prev_state) => ({
            ...prev_state,
            ranks: skill.ranks++,
        }));
        console.log(skill)
        setLimits()
        replaceSkill()
        console.log(skill)
    }

    const decreaseSkillRank = (): void => {
        setSkill((prev_state) => ({
            ...prev_state,
            ranks: skill.ranks--,
        }));
        setLimits()
        replaceSkill()
    }

    const getSkillIndex = (name: string): number => {
        return nemesis.skills.findIndex(skill => skill.name === name)
    }

    const replaceSkill = (): void => {
        const copyNemesis = {...nemesis} as Nemesis
        let copySkills = copyNemesis.skills
        copySkills[getSkillIndex(skill.name)] = skill
        copyNemesis.skills = copySkills
        setNemesis(copyNemesis)
        console.log(nemesis.skills)
    }

    return (
        <Fragment>
            <TableRow>
                <TableCell>{setName()}</TableCell>
                <TableCell>{actorSkill.ranks}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <IconButton title='Increase' size='medium' disabled={disableIncrease} onClick={increaseSkillRank}>
                        <ArrowUpwardIcon color='primary' fontSize='medium' />
                    </IconButton>
                    <IconButton title='Decrease' size='medium' disabled={disableDecrease} onClick={decreaseSkillRank}>
                        <ArrowDownwardIcon color='primary' fontSize='medium' />
                    </IconButton>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

function SkillTypeGroup(props: {nemesis: Nemesis, type: SkillType}) {
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
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {nemesis.skills.filter((skill) => skill.type === type).map((row: ActorSkill) => (
                                        <SkillRow key={row.name} actorSkill={row} nemesisProp={nemesis}/>
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

interface Props {
    nemesis: Nemesis
}

export default function NemesisSkillTable(props: Props) {
    const {nemesis} = props;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign: "center"}}>Skills</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.General} />
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Magic} />
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Combat} />
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Social} />
                    <SkillTypeGroup nemesis={nemesis} type={SkillType.Knowledge} />
                </TableBody>
            </Table>
        </TableContainer>
    );
}