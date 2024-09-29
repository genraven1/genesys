import {Card, CardHeader, Divider, Grid} from "@mui/material"
import InlineTextField from "./InlineTextField"
import InlineTextRowsField from "./InlineTextRowsField";

interface TextProps {
    defaultValue: string
    onCommit: (value: string) => void
    title: string
    helperText: string
    placeholder: string
    errorText?: string
}

export function InputTextFieldCard(props: TextProps) {
    const {defaultValue, onCommit, title, helperText, placeholder, errorText} = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{textAlign: 'center'}}/>
                <Divider/>
                <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit} helperText={helperText}
                                 placeholder={placeholder} errorText={errorText}/>
            </Card>
        </Grid>
    )
}

interface RowProps {
    defaultValue: string
    onCommit: (value: string) => void
    title: string
    helperText: string
    placeholder: string
    errorText?: string
    rows: number
}

export function InputTextRowsFieldCard(props: RowProps) {
    const {defaultValue, onCommit, title, helperText, placeholder, errorText, rows} = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{textAlign: 'center'}}/>
                <Divider/>
                <InlineTextRowsField defaultValue={defaultValue} editable={true} onCommit={onCommit}
                                     helperText={helperText} placeholder={placeholder} errorText={errorText}
                                     rows={rows}/>
            </Card>
        </Grid>
    )
}