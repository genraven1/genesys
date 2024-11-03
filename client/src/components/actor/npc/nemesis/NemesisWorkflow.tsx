import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import ViewAllNemeses from "./ViewAllNemeses";
import {ActorPath} from "../../../../services/RootPath";
import NemesisPage from "./NemesisPage";

export default function NemesisWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Nemesis) ? <ViewAllNemeses/> : <NemesisPage/>}
        </Fragment>
    )
}