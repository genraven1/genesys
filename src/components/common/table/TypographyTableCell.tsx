import React from "react";
import {TableCell, Typography} from "@mui/material";

interface LeftProps {
    value: string
}

export function TypographyLeftTableCell(props: LeftProps): JSX.Element {
    const {value} = props
    return (
        <TableCell style={{textAlign:'left'}}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}

interface CenterProps {
    value: string
    span?: number
}

export function TypographyCenterTableCell(props: CenterProps): JSX.Element {
    const {value, span} = props
    return (
        <TableCell style={{textAlign:'center'}} colSpan={span}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}