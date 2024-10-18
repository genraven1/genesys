import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import {ActorPath} from "../../../services/Path";
import ViewAllPlayers from "./ViewAllPlayers";
import PlayerPage from "./PlayerPage";

export default function PlayerWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Player) ? <ViewAllPlayers/> : <PlayerPage/>}
        </Fragment>
    )
}