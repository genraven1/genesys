import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import RivalArmorSelectionTable from "./RivalArmorSelectionTable";
import Rival from "../../../../../../models/actor/npc/Rival";

interface Props {
    rival: Rival
    open: boolean
    onClose: () => void
}

export default function RivalArmorSelectionDialog(props: Props) {
    const {rival, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Armor'}/>
            <DialogContent>
                <RivalArmorSelectionTable rival={rival}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}