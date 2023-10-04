import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import PlayerView from "./PlayerView";
import Player from "../../../models/actor/player/Player";
import ActorService from "../../../services/ActorService";
import PlayerEdit from "./PlayerEdit";
import {useFetchAllSettings} from "../../setting/SettingWorkflow";

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

export default function PlayerWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const player = useFetchPlayer(name!!)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <PlayerView player={player} settings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return <PlayerEdit play={player} settings={settings}/>
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