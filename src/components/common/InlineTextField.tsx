import { ClickAwayListener, TextField } from "@mui/material";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import EditField from "./EditField";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";

interface Props {
    defaultValue: string
    defaultEdit?: boolean
    editable?: boolean
    onChange?: (value: string) => void
    onCommit: (value: string) => void
    helperText?: string
    disabled?: boolean
    placeholder?: string
    errorText?: string
    inputProps?: InputHTMLAttributes<HTMLInputElement>
}

export default function InlineTextField(props: Props): JSX.Element {
    const { defaultValue, defaultEdit, editable, onChange, onCommit, helperText, disabled, placeholder, errorText, inputProps } = props
    const [textValue, setTextValue] = useState(defaultValue)
    const [edit, setEdit] = useState(defaultEdit ?? false)
    const [error, setError] = useState(false)

    const handleOnCommit = (): void => {
        setEdit(false)

        if(!error) {
            onCommit(textValue)
        }

        setError(false)
    }

    const handleOnCancel = (): void => {
        setTextValue(textValue)
        setEdit(!edit)
    }

    const inputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        let isValid = value.trim() !== ''

        setError(!isValid)
        setTextValue(isValid ? value : defaultValue)

        if (onChange) {
            onChange(value)
        }
    }

    const editElement = (
        <ClickAwayListener onClickAway={handleOnCommit}>
            <TextField defaultValue={textValue} onChange={inputOnChange} helperText={error ? errorText : helperText}
            disabled={Boolean(disabled)} placeholder={placeholder} error={error} inputProps={{ autoFocus: true, ...inputProps}} fullWidth />
        </ClickAwayListener>
    )

    const viewElement = <GenesysDescriptionTypography text={textValue}/>

    return (
        <EditField edit={edit} editable={editable} viewElement={viewElement} editElement={editElement} 
        onEdit={(): void => setEdit(!edit)} onCancel={handleOnCancel} onCommit={handleOnCommit} />
    )
}