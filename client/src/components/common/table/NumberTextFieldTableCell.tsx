import {TextField} from "@mui/material";
import * as React from "react";
import TableCell from "@mui/material/TableCell";

interface Props {
    title: string
    value: number
    onChange: (index: number, value: number) => void
    min: number
    max: number
    disabled: boolean
    index: number
    steps?: number
}

export default function NumberTextFieldTableCell(props: Props) {
    const {title, value, onChange, min, max, disabled, index, steps} = props;

    return (
        <TableCell style={{textAlign: 'center'}}>
            <TextField
                type="number"
                value={value}
                label={title}
                fullWidth
                onChange={(e) => onChange(index, Number(e.target.value))}
                inputProps={{min: min, max: max, step: steps}}
                disabled={disabled}
            />
        </TableCell>
    )
}