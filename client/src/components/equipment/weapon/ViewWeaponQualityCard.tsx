import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import * as React from "react";
import {Weapon} from "../../../models/equipment/Weapon";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";

interface Props {
    weapon: Weapon
}

export default function ViewWeaponQualitiesCard(props: Props): JSX.Element {
    const {weapon} = props

    const renderQualities = (): string => {
        let qualities = ''
        if (weapon?.qualities!!.length > 0) {
            for (const quality of weapon.qualities.sort((a, b) => a.name.localeCompare(b.name))) {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks + ' ')
            }
        }
        else {qualities = 'None'}
        return qualities
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Weapon Special Qualities'} style={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
                    <GenesysDescriptionTypography text={renderQualities()}/>
                </CardContent>
            </Card>
        </Grid>
    )
}