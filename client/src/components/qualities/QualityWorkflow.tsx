import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {useFetchAllSettings} from "../setting/SettingWorkflow";
import Quality from "../../models/Quality";
import QualityService from "../../services/QualityService";
import ViewAllQualities from "./ViewAllQualities";
import QualityView from "./QualityView";
import QualityEdit from "./QualityEdit";


function useFetchQuality(name: string): Quality {
    const [quality, setQuality] = useState<Quality>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const qualityData = await QualityService.getQuality(name)
                if (qualityData) {setQuality(qualityData)}
            } catch (err) {console.log(err)}
        })()
    },[name, setQuality])
    return quality as Quality
}

export default function QualityWorkflow(): JSX.Element {
    const { name } = useParams<{ name?: string }>()
    const quality = useFetchQuality(name!!)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <QualityView quality={quality} allSettings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <QualityEdit qual={quality} allSettings={settings}/>
        }
        else {return <ViewAllQualities/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}