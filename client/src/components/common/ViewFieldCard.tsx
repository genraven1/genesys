import {Card, CardContent, Grid} from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import * as React from "react";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "./typography/GenesysQualityTypography";
import CenteredCardHeader from "./card/CenteredCardHeader";

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

interface QualityActivationProps {
    quality: Quality
}

export function ViewQualityActivationCard(props: QualityActivationProps) {
    const {quality} = props

    const renderActivation = () => {
        return quality?.cost!! === 0 ? <GenesysDescriptionTypography text={'Passive'}/> :
            <GenesysQualityTypography ranks={quality?.cost}/>;
    }

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={quality.name}/>
                {renderActivation()}
            </Card>
        </Grid>
    )
}