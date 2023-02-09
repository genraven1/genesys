import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import SkillService from "../../services/SkillService";
import {Fragment, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import {CareerSkill} from "../../models/actor/player/Career";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";

interface Props {
    skillList: CareerSkill[]
}

export default function CareerSkillTable(): JSX.Element {
    const [skills, setSkills] = useState<CareerSkill[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            let names = await SkillService.getSkillNames()
            if (!names) { return }
            let list = new Array<CareerSkill>()
            names.forEach((name) => list.push({name: name, active: false}))
            list.sort((a, b) => a.name.localeCompare(b.name))
            setSkills(list)
        })()
    }, [setSkills])

    const useCareerSkillSelection = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <CareerSkillTableView  skillList={skills}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <CareerSkillTableEdit skillList={skills} />
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {useCareerSkillSelection()}
        </Fragment>
    )
}

export function CareerSkillTableView(props: Props): JSX.Element {
    const {skillList} = props

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TypographyCenterTableCell value={'Skill'} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {skillList.map((value) => {
                            <TypographyCenterTableCell value={value.name} />
                        })}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function CareerSkillTableEdit(props: Props): JSX.Element {
    const {skillList} = props
    const [skills, setSkills] = useState<CareerSkill[]>(skillList)
    const [state, setState] = useState<CareerSkill[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [event.target.name]: event.target.checked})
    }

    const onChange = (skill: CareerSkill) => {
        let names = new Array<string>()
        skills.forEach((careerSkill) => names.push(careerSkill.name))
        if(names.includes(skill.name)) {
            
        }
    }

    const error = [...skills.values()].filter((v) => v).length !== 8

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl required error={error} component="fieldset" sx={{ m: 3 }} variant="standard">
                <FormLabel component="legend">Pick Eight Skills</FormLabel>
                <FormGroup>
                    {skillList.map((skill: CareerSkill) => (
                        <FormControlLabel control={<Checkbox checked={skill.active} onChange={handleChange} name={skill.name} />} label={skill.name}/>
                    ))}
                </FormGroup>
                <FormHelperText>You must select eight skills</FormHelperText>
            </FormControl>
        </Box>
    )
}