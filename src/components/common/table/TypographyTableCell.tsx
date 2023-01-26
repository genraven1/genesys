import React from "react";
import {TableCell, Typography} from "@mui/material";

export function TypographyLeftTableCell(props: {value: string}): JSX.Element {
    const {value} = props
    return (
        <TableCell style={{textAlign:'left'}}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}

export function TypographyCenterTableCell(props: {value: string}): JSX.Element {
    const {value} = props
    return (
        <TableCell style={{textAlign:'center'}}>
            <Typography>{value}</Typography>
        </TableCell>
    )
}