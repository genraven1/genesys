import SettingService from "../../services/SettingService";
import InputSelectField, {Option} from "../common/InputSelectField";
import * as React from "react";

interface Props {
    settings: string[]
    setting: string
}

export default function SettingSelectionField(props: Props): JSX.Element {
    const {settings, setting} = props

    const getSettings = (): Option[] => {
        let options = new Array<Option>()
        while (settings.length > 0) {
            options.push({value: settings.pop()!!})
        }
        console.log(options)
        return options
    }

    const onChange = async (name: string) => {
        await SettingService.setCurrentSetting(name)
    }

    return (
        <InputSelectField defaultValue={setting!!} options={getSettings()!!} onCommit={(value: string): void => {onChange(value)}} />
    )
}