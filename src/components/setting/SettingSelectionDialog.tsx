import {Dialog, DialogActions, DialogTitle, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import SettingService from "../../services/SettingService";
import Setting from "../../models/Setting";

interface Props {
    open: boolean
    onClose: () => void
    current: Setting
}

export default function SettingSelectionDialog(props: Props) {
    const {open,onClose,current} = props
    const [settings, setSettings] = useState<Setting[]>([])
    const [setting, setSetting] = useState<Setting>(current)

    useEffect(() => {
        (async (): Promise<void> => {
            if (settings.length > 0) {return}
            const settingList = await SettingService.getSettings()
            if (!settingList) {return}
            setSettings(settingList)
        })()
    }, [settings.length, setSettings])

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) { return }
            setSetting(currentSetting)
        })()
    }, [setSetting])

    const getTitle = (): string => {
        return 'Current: ' + setting!!
    }

    const onSettingChange = async (event: SelectChangeEvent) => {
        let set = await SettingService.setCurrentSetting(event.target.value)
        if (!set) {return}
        setSetting(set)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogActions>
                <Select value={current?.name!!} onChange={onSettingChange}>
                    {settings.map((set) => (<MenuItem key={set.name} value={set.name}>{set.name}</MenuItem>))}
                </Select>
            </DialogActions>
        </Dialog>
    )
}
