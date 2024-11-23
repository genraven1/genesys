import * as React from "react";
import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "./header/CenteredCardHeader";
import GenesysTextField from "../GenesysTextField";

interface Props {
    title: string;
    value: string;
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextFieldCard(props: Props) {
    const {title, value, disabled, onChange} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <GenesysTextField text={value} label={title} disabled={disabled} onChange={onChange}/>
                </CardContent>
            </Card>
        </Grid>
    )
}