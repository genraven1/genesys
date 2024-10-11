import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import PlayerView from "./PlayerView";
import Player from "../../../models/actor/player/Player";
import ActorService from "../../../services/ActorService";
import PlayerEdit from "./PlayerEdit";

function useFetchPlayer(name: string): Player {
    const [player, setPlayer] = useState<Player>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const playerData = await ActorService.getPlayer(name)
                if (playerData) {
                    setPlayer(playerData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setPlayer])
    return player as Player
}

export default function PlayerWorkflow() {
    const {id} = useParams<{ id?: string }>()
    const player = useFetchPlayer(id!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return player && <PlayerView player={player}/>
        } else if (pathname.endsWith('/edit')) {
            return player && <PlayerEdit play={player}/>
        } else {
            return <Fragment/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}