import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import SettingSelectionField from "./SettingSelectionField";
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
        return 'Current Setting: ' + current
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={getTitle()}/>
            <DialogActions>
                <SettingSelectionField settings={settings!!} setting={setting!!}/>
            </DialogActions>
        </Dialog>
    )
}
