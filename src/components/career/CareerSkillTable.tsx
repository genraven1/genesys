import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import InputSelectField, {Option} from "../common/InputSelectField";
import SkillService from "../../services/SkillService";
import {Fragment, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Button} from "@mui/material";

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
    const [skills, setSkills] = useState<string[]>([])
    const [names, setNames] = useState<string[]>([])

    useEffect(() => {
        (async (): Promise<void> => {
            let name_list = await SkillService.getSkillNames()
            setNames(name_list)
        })()
    }, [])

    const getSkillNameOptions = (): Option[] => {
        return names.map((value) => ({value}))
    }

    const addSkill = () => {

    }

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
                    <TableCell>

                    </TableCell>
                    <TableCell>
                        <Button onClick={addSkill}>Select</Button>
                    </TableCell>
                </TableBody>
            </Table>
        </TableContainer>
    )
}