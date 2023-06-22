import {Card, CardContent, Divider} from "@mui/material";
import * as React from "react";
import Setting from "../../models/Setting";
import {renderSettings} from "./setting/SettingRenders";
import CenteredCardHeader from "./card/CenteredCardHeader";

interface Props {
    settingNames: string[]
    allSettings: Setting[]
}

export default function ViewSettingsCard(props: Props): JSX.Element {
    const {settingNames, allSettings} = props

    return (
        <Card>
            <CenteredCardHeader title={'Settings'}/>
            <Divider/>
            <CardContent>
                {renderSettings(settingNames, allSettings)}
            </CardContent>
        </Card>
    )
}