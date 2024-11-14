import TableCell from "@mui/material/TableCell";
import {TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";

interface Props {
    onChange: (index: number, value: string) => void
    value: string
    index: number
}

export default function TextFieldTableCell(props: Props) {
    const {onChange, value, index} = props;
    const [name, setName] = useState(value);

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
        onChange(index, value);
    }

    return (
        <TableCell style={{textAlign: 'left'}}>
            <TextField onChange={onNameChange} value={name} fullWidth/>
        </TableCell>
    )
}