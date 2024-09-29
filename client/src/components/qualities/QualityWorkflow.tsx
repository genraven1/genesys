import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Quality from "../../models/Quality";
import QualityService from "../../services/QualityService";
import ViewAllQualities from "./ViewAllQualities";
import QualityView from "./QualityView";
import QualityEdit from "./QualityEdit";


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
    const {id} = useParams<{ id?: string }>()
    const quality = useFetchQuality(id as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return quality && <QualityView quality={quality}/>
        } else if (pathname.endsWith('/edit')) {
            return quality && <QualityEdit qual={quality}/>
        } else {
            return <ViewAllQualities/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}