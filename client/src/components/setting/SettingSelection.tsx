import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import * as React from "react";
import Setting from "../../models/Setting";
import {useEffect, useState} from "react";
import SettingService from "../../services/SettingService";

interface Props {
    onSettingChange: (event: SelectChangeEvent) => void
}

export default function SettingSelection(props: Props): JSX.Element {
    const {onSettingChange} = props
    const [settings, setSettings] = useState<Setting[]>([])
    const [setting, setSetting] = useState<Setting>()

    useEffect(() => {
        (async (): Promise<void> => {
            if (settings.length > 0) {
                return
            }
            const settingList = await SettingService.getSettings()
            if (!settingList) {
                return
            }
            setSettings(settingList)
        })()
    }, [settings.length, setSettings])

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) {
                return
            }
            setSetting(currentSetting)
        })()
    }, [setSetting])

    return (
        <Select value={setting?.name!!} onChange={onSettingChange}>
            {settings.map((set) => (<MenuItem key={set.name} value={set.name}>{set.name}</MenuItem>))}
        </Select>
    )
}