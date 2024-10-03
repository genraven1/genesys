import Injury from "../../models/Injury";
import InjuryService from "../../services/InjuryService";
import {Fragment, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import ViewAllInjuries from "./ViewAllInjuries";
import {RootPath} from "../../services/Path";
import InjuryPage from "./InjuryPage";

function useFetchInjury(id: string): Injury {
    const [injury, setInjury] = useState<Injury>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setInjury(await InjuryService.getInjury(id))
        })()
    }, [id, setInjury])
    return injury as Injury
}

export default function InjuryWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Injury) ? <ViewAllInjuries/> : <InjuryPage/>}
        </Fragment>
    )
}