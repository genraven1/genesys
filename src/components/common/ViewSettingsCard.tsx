import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import * as React from "react";
import {Fragment} from "react";
import Setting from "../../models/Setting";
import GenesysDescriptionTypography from "./typography/GenesysDescriptionTypography";

interface Props {
    settingNames: string[]
    allSettings: Setting[]
}

export default function ViewSettingsCard(props: Props): JSX.Element {
    const {settingNames, allSettings} = props

    const renderSettings = (settings: string[]):JSX.Element => {
        if (settings === undefined) {
            return <Fragment/>
        }
        let settingList = []
        for (let setting of allSettings) {
            if (settings.includes(setting.name)) {
                settingList.push(setting)
            }
        }
        return (
            <Fragment>
                {(settingList || []).map((setting: Setting):JSX.Element => {
                    return <GenesysDescriptionTypography text={setting?.name!!}/>
                })}
            </Fragment>
        )
    }

    return (
        <Grid item xs>
            <Card>
                <CardHeader title={'Settings'} style={{ textAlign: 'center' }} />
                <Divider />
                <CardContent>
                    {renderSettings(settingNames)}
                </CardContent>
            </Card>
        </Grid>
    )
}