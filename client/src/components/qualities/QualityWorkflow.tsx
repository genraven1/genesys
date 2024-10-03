import {Fragment, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Quality from "../../models/Quality";
import QualityService from "../../services/QualityService";
import ViewAllQualities from "./ViewAllQualities";
import {RootPath} from "../../services/Path";
import QualityPage from "./QualityPage";


function useFetchQuality(id: string): Quality {
    const [quality, setQuality] = useState<Quality>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setQuality(await QualityService.getQuality(id))
        })()
    }, [id, setQuality])
    return quality as Quality
}

export default function QualityWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Qualities) ? <ViewAllQualities/> : <QualityPage/>}
        </Fragment>
    )
}