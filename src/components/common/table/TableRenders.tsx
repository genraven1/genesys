import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "./TypographyTableCell";
import * as React from "react";

export const renderHeaders = (headers: string[]): JSX.Element => {
    return (
        <TableRow>
            {headers.map((header: string) => (
                <TypographyCenterTableCell value={header}/>
            ))}
        </TableRow>
    )
}