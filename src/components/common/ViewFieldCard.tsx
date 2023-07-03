import InputNumberRangeSelectField from "./InputNumberRangeSelect";
import InlineTextField from "./InlineTextField";
import {Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography} from "@mui/material";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";
import * as React from "react";
import Quality from "../../models/Quality";
import GenesysQualityTypography from "./typography/GenesysQualityTypography";
import CenteredCardHeader from "./card/CenteredCardHeader";
import {CenteredGenesysTypography} from "./typography/GenesysTypography";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface ViewProps {
    name: string
    value: string
}

export function ViewFieldCard(props: ViewProps): JSX.Element {
    const {name, value} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={name}/>
                <Divider/>
                <CardContent>
                    <GenesysDescriptionTypography text={value}/>
                </CardContent>
            </Card>
        </Grid>
    )
}

interface ViewNumberProps {
    name: string
    value: number
}

export function ViewNumberFieldCard(props: ViewNumberProps): JSX.Element {
    const {name, value} = props
    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={name}/>
                <Divider/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(value)}/>
                </CardContent>
            </Card>
        </Grid>
    )
}

interface ViewBooleanProps {
    name: string
    value: boolean
}

export function ViewBooleanFieldCard(props: ViewBooleanProps): JSX.Element {
    const {name, value} = props

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={name}/>
                <Divider/>
                <CardContent>
                    <Typography style={{ textAlign: 'center' }}>
                        {value ? <CheckIcon color='primary' fontSize='small' />: <CancelIcon color='primary' fontSize='small' />}
                    </Typography>
                </CardContent>
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

export function EditStringFieldCard(props: EditStringProps): JSX.Element {
    const {defaultValue, onCommit, title, errorText} = props;
    return (
        <Grid item xs>
            <Card>
                <CardHeader title={title} style={{textAlign: 'center'}}/>
                <Divider/>
                <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit}
                                 helperText={defaultValue} placeholder={defaultValue} errorText={errorText}/>
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

export function EditNumberFieldCard(props: EditNumberProps): JSX.Element {
    const {value, title, onChange, min, max} = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={title}/>
                <Divider/>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={value} min={min} max={max} onCommit={onChange}/>
                </CardActions>
            </Card>
        </Grid>
    )
}

interface QualityActivationProps {
    quality: Quality
}

export function ViewQualityActivationCard(props: QualityActivationProps): JSX.Element {
    const {quality} = props

    const renderActivation = (): JSX.Element => {
        if (quality?.passive!!) {
            return <CenteredGenesysTypography value={'Passive'}/>
        } else {
            return <GenesysQualityTypography ranks={quality?.cost}/>
        }
    }

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={quality?.name!!}/>
                <Divider/>
                <CardContent>
                    {renderActivation()}
                </CardContent>
            </Card>
        </Grid>
    )
}