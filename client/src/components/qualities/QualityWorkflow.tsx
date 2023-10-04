import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Quality from "../../models/Quality";
import QualityService from "../../services/QualityService";
import ViewAllQualities from "./ViewAllQualities";
import QualityView from "./QualityView";
import QualityEdit from "./QualityEdit";


function useFetchQuality(id: number): Quality {
    const [quality, setQuality] = useState<Quality>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            try {
                const qualityData = await QualityService.getQuality(id)
                if (qualityData) {
                    setQuality(qualityData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id, setQuality])
    return quality as Quality
}

export default function QualityWorkflow(): JSX.Element {
    const {id} = useParams<{ id?: string }>()
    const quality = useFetchQuality(Number(id!!))

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <QualityView quality={quality}/>
        } else if (pathname.endsWith('/edit')) {
            return <QualityEdit qual={quality}/>
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