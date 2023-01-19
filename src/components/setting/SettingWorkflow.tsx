import {Fragment, useEffect, useState} from "react";
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";
import {useLocation, useParams} from "react-router-dom";
import SettingEdit from "./SettingEdit";
import SettingView from "./SettingView";


function useFetchSetting(name: string): Setting {
    const [setting, setSetting] = useState<Setting>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const settingData = await SettingService.getSetting(name)
                if (settingData) {setSetting(settingData)}
            } catch (err) {console.log(err)}
        })()
    },[name, setSetting])
    return setting as Setting
}

export default function SettingWorkflow(): JSX.Element {
    const { name } = useParams<{ name?: string }>()
    const setting = useFetchSetting(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <SettingView  setting={setting}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <SettingEdit set={setting}/>
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}