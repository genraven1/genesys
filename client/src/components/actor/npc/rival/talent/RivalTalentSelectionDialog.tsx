import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import RivalTalentSelectionTable from "./RivalTalentSelectionTable";
import Rival from "../../../../../models/actor/npc/Rival";

interface Props {
    rival: Rival
    open: boolean
    onClose: () => void
}

export default function RivalTalentSelectionDialog(props: Props) {
    const {rival, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Talent'}/>
            <DialogContent>
                <RivalTalentSelectionTable rival={rival}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}