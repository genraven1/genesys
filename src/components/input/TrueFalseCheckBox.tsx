import {CardHeader, Checkbox, Divider, Grid} from "@mui/material";
import {ChangeEvent} from "react";

interface Props {
    title: string,
    onClick: (value: boolean) => void,
}

export default function TrueFalseCheckbox(props: Props): JSX.Element {
    const { title, onClick } = props;

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const eventValue = event.target.value
        if (eventValue === 'on') {
            onClick(true)
        }
        else {
            onClick(false)
        }
    }

    return (
        <Grid item xs>
            <CardHeader title={title} style={{ textAlign: 'center' }} />
            <Divider />
            <Checkbox onChange={onChange} style={{ textAlign: 'center' }} />
        </Grid>
    )
}