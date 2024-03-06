import {Dialog, DialogActions, DialogTitle, SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import SettingService from "../../services/SettingService";
import Setting from "../../models/Setting";
import SettingSelection from "./SettingSelection";

interface Props {
    open: boolean
    onClose: () => void
    current: Setting
}

export default function SettingSelectionDialog(props: Props) {
    const {open,onClose,current} = props
    const [setting, setSetting] = useState<Setting>(current)

    const getTitle = (): string => {
        return 'Current: ' + setting.name
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
                <SettingSelection onSettingChange={onSettingChange}/>
            </DialogActions>
        </Dialog>
    )
}
