import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import SkillService from "../../services/SkillService";
import {Fragment, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import {CareerSkill} from "../../models/actor/player/Career";

export default function CareerSkillTable(): JSX.Element {
    const useCareerSkillSelection = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <CareerSkillTableView />
        }
        else if (pathname.endsWith('/edit')) {
            return <CareerSkillTableEdit />
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {useCareerSkillSelection()}
        </Fragment>
    )
}

export function CareerSkillTableView(): JSX.Element {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Skill Name</TableCell>
                        <TableCell>Add</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function CareerSkillTableEdit(): JSX.Element {
    const [skills, setSkills] = useState<CareerSkill[]>([])
    const [state, setState] = useState<CareerSkill[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            let names = await SkillService.getSkillNames()
            if (!names) { return }
            let list = new Array<CareerSkill>()
            for (let name in names) {
                list.push({name: name, active: false})
            }
            setSkills(list)
        })()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {setState({...state, [event.target.name]: event.target.checked,})}

    const error = [...skills.values()].filter((v) => v).length !== 8

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl required error={error} component="fieldset" sx={{ m: 3 }} variant="standard">
                <FormLabel component="legend">Pick Eight Skills</FormLabel>
                <FormGroup>
                    {skills.map((skill: CareerSkill) => (
                        <FormControlLabel control={<Checkbox checked={skill.active} onChange={handleChange} name={skill.name} />} label={skill.name}/>
                    ))}
                </FormGroup>
                <FormHelperText>You must select eight skills</FormHelperText>
            </FormControl>
        </Box>
    )
}