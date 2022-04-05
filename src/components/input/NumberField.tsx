import { ClickAwayListener, TextField, Typography } from "@mui/material";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import EditField from "./EditField";

export interface Props {
    defaultValue: number,
    defaultEdit?: boolean,
    editable?: boolean,
    onChange?: (value: number) => void,
    onCommit: (value: number) => void,
    helperText?: string,
    disabled?: boolean,
    placeholder?: string,
    errorText?: string,
    inputProps?: InputHTMLAttributes<HTMLInputElement>,
    max?: number,
    min?: number,
}

export default function InlineNumberField(props: Props): JSX.Element {
    const { defaultValue, defaultEdit, editable, onChange, onCommit, helperText, disabled, placeholder, errorText, inputProps, max, min } = props;
    const [numberValue, setNumberValue] = useState(defaultValue);
    const [edit, setEdit] = useState(defaultEdit ?? false);
    const [error, setError] = useState(false);

    const handleOnCommit = (): void => {
        setEdit(false);

        if(!error) {
            onCommit(numberValue);
        }

        setError(false);
    }

    const handleOnCancel = (): void => {
        setNumberValue(defaultValue);
        setEdit(!edit);
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        let isValid = true;

        if (min) {
            isValid = +value > min;
        }
        if (max) {
            isValid = +value < max;
        }

        setError(!isValid);
        setNumberValue(isValid ? +value : defaultValue);

        if (onChange) {
            onChange(+value)
        }
    }

    const editElement = (
        <ClickAwayListener onClickAway={handleOnCommit}>
            <TextField defaultValue={numberValue} onChange={inputOnChange} helperText={error ? errorText : helperText} size='small'
            disabled={Boolean(disabled)} placeholder={placeholder} error={error} inputProps={{ autoFocus: true, ...inputProps}} />
        </ClickAwayListener>
    )

    const viewElement = <Typography variant='body1' style={{ wordWrap: 'break-word' }}>{numberValue}</Typography>

    return (
        <EditField edit={edit} editable={editable} viewElement={viewElement} editElement={editElement} 
        onEdit={(): void => setEdit(!edit)} onCancel={handleOnCancel} onCommit={handleOnCommit} />
    )
}