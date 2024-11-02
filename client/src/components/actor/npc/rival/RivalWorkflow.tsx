import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import {ActorPath} from "../../../../services/RootPath";
import ViewAllRivals from "./ViewAllRivals";
import RivalPage from "./RivalPage";

export default function RivalWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Rival) ? <ViewAllRivals/> : <RivalPage/>}
        </Fragment>
    )
}