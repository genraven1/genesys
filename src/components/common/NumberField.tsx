import { ClickAwayListener, TextField } from "@mui/material";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import EditField from "../input/EditField";
import GenesysDescriptionTypography from "../common/GenesysDescriptionTypography";

interface Props {
    defaultValue: number,
    defaultEdit?: boolean,
    editable?: boolean,
    onChange?: (value: number) => void,
    onCommit: (value: number) => void,
    helperText?: string,
    disabled?: boolean,
    placeholder?: string,
    errorText?: string,
    inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export default function InlineNumberField(props: Props): JSX.Element {
    const { defaultValue, defaultEdit, editable, onChange, onCommit, helperText, disabled, placeholder, errorText, inputProps } = props;
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
        setNumberValue(numberValue);
        setEdit(!edit);
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let value = +event.target.value

        if (onChange) {
            onChange(value)
            setNumberValue(value)
        }
    }

    const editElement = (
        <ClickAwayListener onClickAway={handleOnCommit}>
            <TextField defaultValue={numberValue} onChange={inputOnChange} helperText={error ? errorText : helperText}
                       disabled={Boolean(disabled)} placeholder={placeholder} error={error} inputProps={{ autoFocus: true, ...inputProps}} fullWidth />
        </ClickAwayListener>
    )

    const viewElement = <GenesysDescriptionTypography text={String(numberValue)}/>

    return (
        <EditField edit={edit} editable={editable} viewElement={viewElement} editElement={editElement}
                   onEdit={(): void => setEdit(!edit)} onCancel={handleOnCancel} onCommit={handleOnCommit} />
    )
}