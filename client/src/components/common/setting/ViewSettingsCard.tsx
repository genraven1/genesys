import {Card, CardContent, Divider} from "@mui/material";
import * as React from "react";
import Setting from "../../../models/Setting";
import {renderSettings} from "./SettingRenders";
import CenteredCardHeader from "../card/CenteredCardHeader";

interface Props {
    settings: Setting[]
    allSettings: Setting[]
}

export default function ViewSettingsCard(props: Props): JSX.Element {
    const {settings, allSettings} = props

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Settings'}/>
            <Divider/>
            <CardContent>
                {renderSettings(settings, allSettings)}
            </CardContent>
        </Card>
    )
}