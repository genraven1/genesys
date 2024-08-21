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

function useFetchSetting(name: string): Setting {
    const [setting, setSetting] = useState<Setting>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const settingData = await SettingService.getSetting(name)
                if (settingData) {
                    setSetting(settingData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setSetting])
    return setting as Setting
}

export default function SettingWorkflow() {
    const {name} = useParams<{ name?: string }>()
    const setting = useFetchSetting(name as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return setting && <SettingView setting={setting}/>
        } else if (pathname.endsWith('/edit')) {
            return setting && <SettingEdit set={setting}/>
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