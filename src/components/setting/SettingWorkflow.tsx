import {Fragment, useEffect, useState} from "react";
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";
import {useLocation, useParams} from "react-router-dom";
import SettingEdit from "./SettingEdit";
import SettingView from "./SettingView";
import ViewAllSettings from "./ViewAllSettings";

export function getCurrentSetting(setSetting: (setting: Setting) => void) {
    (async (): Promise<void> => {
        const current = await SettingService.getCurrentSetting()
        if (!current) {return}
        setSetting(current)
    })()
}

function useFetchSetting(id: number): Setting {
    const [setting, setSetting] = useState<Setting>()
    useEffect(() => {
        if(!id) {return}
        (async (): Promise<void> => {
            try {
                const settingData = await SettingService.getSetting(id)
                if (settingData) {setSetting(settingData)}
            } catch (err) {console.log(err)}
        })()
    },[id, setSetting])
    return setting as Setting
}

export default function SettingWorkflow(): JSX.Element {
    const { id } = useParams<{ id?: string }>()
    const setting = useFetchSetting(Number(id!!))

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <SettingView  setting={setting}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <SettingEdit set={setting}/>
        }
        else {return <ViewAllSettings/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}