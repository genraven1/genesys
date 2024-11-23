import {Card, CardContent, Grid} from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import * as React from "react";
import CenteredCardHeader from "./card/header/CenteredCardHeader";

interface ViewProps {
    name: string
    value: string
}

export function ViewFieldCard(props: ViewProps) {
    const {name, value} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={name}/>
                <CardContent>
                    <GenesysDescriptionTypography text={value}/>
                </CardContent>
            </Card>
        </Grid>
    )
}