import Setting from "../../../models/Setting";
import {TypographyCenterTableCell} from "./TypographyTableCell";
import * as React from "react";

interface Props {
    settings: Setting[]
    setting: Setting
}

export default function SettingTableCell(props: Props): JSX.Element {
    const {settings, setting} = props
    let value = "No"
    for (const set of settings) {
        if (setting.name === set.name) {
            value = "Yes"
        }
    }
    return <TypographyCenterTableCell value={value}/>
}