import {Fragment} from "react";
import Setting from "../../../models/Setting";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import * as React from "react";

export const renderSettings = (settings: number[], allSettings: Setting[]):JSX.Element => {
    if (settings === undefined) {
        return <GenesysDescriptionTypography text={'None'}/>
    }
    let settingList = []
    for (let setting of allSettings) {
        if (settings.includes(setting.id)) {
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