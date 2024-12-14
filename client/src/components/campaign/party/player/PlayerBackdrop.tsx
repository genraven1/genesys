import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Player from "../../../../models/actor/player/Player";
import PlayerView from "./PlayerView";

interface Props {
    player: Player
    open: boolean
    onClose: () => void
}

export default function PlayerBackdrop(props: Props) {
    const {player, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <PlayerView player={player}/>
        </Backdrop>
    )
}
