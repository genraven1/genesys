import {Fragment, useEffect, useState} from "react";
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";
import {useLocation, useParams} from "react-router-dom";
import SettingEdit from "./SettingEdit";
import SettingView from "./SettingView";
import ViewAllSettings from "./ViewAllSettings";

export function useFetchAllSettings(): Setting[] {
    const [settings, setSettings] = useState<Setting[]>([])
    useEffect(() => {
        (async (): Promise<void> => {
            if (settings.length > 0) {
                return
            }
            try {
                const settingList = await SettingService.getSettings()
                if (settingList) {
                    setSettings(settingList)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [settings.length, setSettings])
    return settings
}

function useFetchSetting(id: number): Setting {
    const [setting, setSetting] = useState<Setting>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            try {
                const settingData = await SettingService.getSetting(id)
                if (settingData) {
                    setSetting(settingData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id, setSetting])
    return setting as Setting
}

export function useFetchCurrentSetting(): Setting {
    const [setting, setSetting] = useState<Setting>()
    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const currentSetting = await SettingService.getCurrentSetting()
                if (currentSetting) {
                    setSetting(currentSetting)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [setSetting])
    return setting as Setting
}

export default function SettingWorkflow(): JSX.Element {
    const {id} = useParams<{ id?: string }>()
    const setting = useFetchSetting(Number(id!!))

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <SettingView setting={setting}/>
        } else if (pathname.endsWith('/edit')) {
            return <SettingEdit set={setting}/>
        } else {
            return <ViewAllSettings/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}