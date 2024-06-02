import {Card, CardContent, Grid} from "@mui/material";
import InputSelectField, {Option} from "./InputSelectField";
import CenteredCardHeader from "./card/CenteredCardHeader";

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
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <InputSelectField defaultValue={defaultValue} options={options} onCommit={onCommit}/>
                </CardContent>
            </Card>
        </Grid>
    )
}