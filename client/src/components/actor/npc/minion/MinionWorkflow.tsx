import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Minion from "../../../../models/actor/npc/Minion";
import MinionView from "./MinionView";
import MinionEdit from "./MinionEdit";
import ViewAllMinions from "./ViewAllMinion";
import {ActorPath} from "../../../../services/RootPath";
import ViewAllRivals from "../rival/ViewAllRivals";
import RivalPage from "../rival/RivalPage";
import MinionPage from "./MinionPage";

export default function MinionWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Rival) ? <ViewAllMinions/> : <MinionPage/>}
        </Fragment>
    )
}