import {Fragment, useEffect, useState} from "react";
import Talent from "../../models/Talent";
import TalentService from "../../services/TalentService";
import {useLocation} from "react-router-dom";
import ViewAllTalents from "./ViewAllTalents";
import TalentPage from "./TalentPage";
import {RootPath} from "../../services/Path";


function useFetchTalent(id: string): Talent {
    const [talent, setTalent] = useState<Talent>()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setTalent(await TalentService.getTalent(id))
        })()
    }, [id, setTalent])
    return talent as Talent
}

export default function TalentWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Talent) ? <ViewAllTalents/> : <TalentPage/>}
        </Fragment>
    )
}