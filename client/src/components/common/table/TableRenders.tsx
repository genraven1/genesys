import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell, TypographyLeftTableCell} from "./TypographyTableCell";
import * as React from "react";
import Skill from "../../../models/actor/Skill";
import TableHead from "@mui/material/TableHead";

export const renderHeaders = (headers: string[]): JSX.Element => {
    return (
        <TableRow>
            {headers.map((header: string) => (
                <TypographyCenterTableCell value={header}/>
            ))}
        </TableRow>
    )
}

export const renderSingleRowTableHeader = (headers: string[]): JSX.Element => {
    return (
        <TableHead>
            {renderHeaders(headers)}
        </TableHead>
    )
}

export const renderDoubleRowTableHeader = (headers: string[], value: string, colSpan: number): JSX.Element => {
    return (
        <TableHead>
            <TableRow>
                <TypographyCenterTableCell value={value} span={colSpan}/>
            </TableRow>
            {renderHeaders(headers)}
        </TableHead>
    )
}

export const renderSkillName = (skill: Skill): JSX.Element => {
    return <TypographyLeftTableCell value={skill.name + '(' + skill.characteristic + ')'}/>
}