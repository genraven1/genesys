import {Dialog, DialogActions, DialogTitle, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import SettingService from "../../services/SettingService";

interface Props {
    open: boolean
    onClose: () => void
    current: string
}

export default function SettingSelectionDialog(props: Props) {
    const {open,onClose,current} = props
    const [settings, setSettings] = useState<string[]>([])
    const [setting, setSetting] = useState<string>(current)

    useEffect(() => {
        (async (): Promise<void> => {
            if (settings.length > 0) {return}
            const settingList = await SettingService.getSettingNames()
            if (!settingList) {return}
            setSettings(settingList)
        })()
    }, [settings.length, setSettings])

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) { return }
            setSetting(currentSetting.name)
        })()
    }, [setSetting])

    const getTitle = (): string => {
        console.log('Current Setting: ' + setting!!)
        return 'Current Setting: ' + setting!!
    }

    const onSettingChange = async (event: SelectChangeEvent) => {
        let set = await SettingService.setCurrentSetting(event.target.value as string)
        if (!set) {return}
        setSetting(set.name)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={getTitle()}/>
            <DialogActions>
                <Select value={current} onChange={onSettingChange}>
                    {settings.map((opt) => (<MenuItem key={opt} value={opt}>{opt}</MenuItem>))}
                </Select>
            </DialogActions>
        </Dialog>
    )
}
