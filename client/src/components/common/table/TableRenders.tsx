import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "./TypographyTableCell";
import * as React from "react";
import Skill from "../../../models/actor/Skill";

export const renderHeaders = (headers: string[]): JSX.Element => {
    return (
        <TableRow>
            {headers.map((header: string) => (
                <TypographyCenterTableCell value={header}/>
            ))}
        </TableRow>
    )
}

export const renderSkillName = (skill: Skill): JSX.Element => {
    return <TypographyLeftTableCell value={skill.name + '(' + skill.characteristic + ')'}/>
}