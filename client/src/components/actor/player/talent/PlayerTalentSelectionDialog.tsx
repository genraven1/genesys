import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import PlayerTalentSelectionTable from "./PlayerTalentSelectionTable";
import Player from "../../../../models/actor/player/Player";

interface Props {
    player: Player
    open: boolean
    onClose: () => void
}

export default function PlayerTalentSelectionDialog(props: Props) {
    const {player, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Talent'}/>
            <DialogContent>
                <PlayerTalentSelectionTable player={player}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}