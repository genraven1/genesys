import { ClickAwayListener, MenuItem, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import EditField from "./EditField";

export interface Option {
    value: string
}

interface Props {
    defaultValue: string
    options: Option[]
    defaultEdit?: boolean
    editable?: boolean
    onChange?: (value: string) => void
    onCommit: (value: string) => void
    helperText?: string
}

export default function InputSelectField(props: Props): JSX.Element {
    const { defaultValue, defaultEdit, options, editable, onChange, onCommit, helperText } = props
    const [option, setOption] = useState(defaultValue)
    const [edit, setEdit] = useState(defaultEdit ?? false)

    const handleOnCommit = (): void => {
        setEdit(!edit)
        onCommit(option)
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setOption(event.target.value)

        if (onChange) {
            onChange(event.target.value)
        }
    }

    const editElement = (
        <ClickAwayListener mouseEvent="onMouseUp" onClickAway={handleOnCommit}>
            <TextField value={option} helperText={helperText} onChange={inputOnChange} select>
                {
                    options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.value}
                        </MenuItem>
                    ))
                }
            </TextField>
        </ClickAwayListener>
    )

    const viewElement = <Typography style={{ wordWrap: 'break-word' }}>{option}</Typography>

    const onCancel = (): void => {
        setEdit(!edit)
        setOption(defaultValue)
    }

    return (
        <EditField viewElement={viewElement} edit={edit} editable={editable} editElement={editElement} onEdit={(): void => setEdit(!edit)} onCancel={(): void => onCancel()} onCommit={handleOnCommit}/>
    )
}