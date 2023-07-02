import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import InputSelectField, {Option} from "./InputSelectField";

interface TextProps {
    defaultValue: string
    onCommit: (value: string) => void
    title: string
    options: Option[]
}

export default function InputSelectFieldCard(props: TextProps): JSX.Element {
    const {defaultValue, onCommit, title, options} = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{textAlign: 'center'}}/>
                <CardContent>
                    <InputSelectField defaultValue={defaultValue} options={options} onCommit={onCommit}/>
                </CardContent>
            </Card>
        </Grid>
    )
}