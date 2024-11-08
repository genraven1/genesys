import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import ViewAllMinions from "./ViewAllMinion";
import {ActorPath} from "../../../../services/RootPath";
import MinionPage from "./MinionPage";

export default function MinionWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Minion) ? <ViewAllMinions/> : <MinionPage/>}
        </Fragment>
    )
}