import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import RivalWeaponSelectionTable from "./RivalWeaponSelectionTable";
import Rival from "../../../../../models/actor/npc/Rival";

interface Props {
    rival: Rival
    open: boolean
    onClose: () => void
}

export default function WeaponSelectionDialog(props: Props) {
    const {rival, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Weapon'}/>
            <DialogContent>
                <RivalWeaponSelectionTable rival={rival}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}