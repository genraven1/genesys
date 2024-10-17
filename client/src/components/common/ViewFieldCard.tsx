import {Card, CardContent, Grid, TextField} from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import * as React from "react";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "./typography/GenesysQualityTypography";
import {CharacteristicType} from "../../models/character/Characteristic";
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

interface CharacteristicProps {
    type: CharacteristicType
    value: number
    handleCharacteristicChange: (type: CharacteristicType, value: number) => void
    disabled: boolean
}

export function CharacteristicCard(props: CharacteristicProps) {
    const {type, value, handleCharacteristicChange, disabled} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Characteristic Type'}/>
                <CardContent>
                    <TextField
                        type="number"
                        value={value}
                        label={type}
                        fullWidth
                        onChange={(e) => handleCharacteristicChange(type, Number(e.target.value))}
                        inputProps={{min: 1, max: 5}}
                        disabled={disabled}
                    />
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