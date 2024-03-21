import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Career from "../../models/actor/player/Career";
import CareerService from "../../services/CareerService";
import ViewAllCareers from "./ViewAllCareers";
import CareerView from "./CareerView";
import CareerEdit from "./CareerEdit";

function useFetchCareer(name: string): Career {
    const [career, setCareer] = useState<Career>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const careerData = await CareerService.getCareer(name)
                if (careerData) {
                    setCareer(careerData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setCareer])
    return career as Career
}

export default function CareerWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const career = useFetchCareer(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return career && <CareerView career={career}/>
        } else if (pathname.endsWith('/edit')) {
            return career && <CareerEdit car={career}/>
        } else {
            return <ViewAllCareers/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}