import InputNumberRangeSelectField from "./InputNumberRangeSelect";
import InlineTextField from "./InlineTextField";
import {Card, CardActions, CardHeader, Divider, Grid} from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "./typography/GenesysQualityTypography";

interface ViewProps {
    name: string
    value: string
}

export function ViewFieldCard(props: ViewProps) {
    const {name, value} = props
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={name} style={{ textAlign: 'center' }} />
                <Divider />
                <GenesysDescriptionTypography text={value}/>
            </Card>
        </Grid>
    )
}

interface ViewNumberProps {
    name: string
    value: number
}

export function ViewNumberFieldCard(props: ViewNumberProps) {
    const {name, value} = props
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={name} style={{ textAlign: 'center' }} />
                <Divider />
                <Typography>{value}</Typography>
            </Card>
        </Grid>
    )
}

interface EditStringProps {
    defaultValue: string,
    onCommit: (value: string) => void,
    title: string,
    errorText?: string,
}

export function EditStringFieldCard(props: EditStringProps) {
    const { defaultValue, onCommit, title, errorText } = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit} helperText={defaultValue} placeholder={defaultValue} errorText={errorText} />
            </Card>
        </Grid>
    )
}

interface EditNumberProps {
    value: number,
    title: string,
    onChange: (value: number) => void
    min: number
    max: number
}

export function EditNumberFieldCard(props: EditNumberProps) {
    const { value, title, onChange, min, max } = props;

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{ textAlign: 'center' }} />
                <Divider />
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={value} min={min} max={max} onCommit={onChange} />
                </CardActions>
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
        return quality?.passive!! ? <GenesysDescriptionTypography text={'Passive'}/> :
            <GenesysQualityTypography ranks={quality?.cost}/>;
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={quality?.name!!} style={{ textAlign: 'center' }} />
                <Divider />
                {renderActivation()}
            </Card>
        </Grid>
    )
}