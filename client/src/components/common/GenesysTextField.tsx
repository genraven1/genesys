import {TextField} from "@mui/material";

interface GenesysTextFieldProps {
    text: string;
    label: string;
    disabled: boolean;
    onChange: (value: string) => void
}

export default function GenesysTextField(props: GenesysTextFieldProps) {
    const {text, label, disabled, onChange} = props;

    return (
        <TextField
            value={text}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            disabled={disabled}
            label={label}
            onChange={(e) => onChange}
        />
    );
}
