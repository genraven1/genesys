import { Card, CardHeader, Divider, Grid } from "@mui/material"
import InlineTextField from "./InlineTextField"

interface Props {
    defaultValue: string,
    onCommit: (value: string) => void,
    title: string,
    helperText: string,
    placeholder: string,
    errorText?: string,
}

export default function InputTextFieldCard(props: Props): JSX.Element {
    const { defaultValue, onCommit, title, helperText, placeholder, errorText } = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit} helperText={helperText} placeholder={placeholder} errorText={errorText} />
            </Card>
        </Grid>
    )
}