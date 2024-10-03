import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import ViewAllTalents from "./ViewAllTalents";
import TalentPage from "./TalentPage";
import {RootPath} from "../../services/Path";

export default function TalentWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(RootPath.Talent) ? <ViewAllTalents/> : <TalentPage/>}
        </Fragment>
    )
}