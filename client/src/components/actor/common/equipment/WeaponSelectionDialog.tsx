import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Actor from "../../../../models/actor/Actor";
import WeaponSelectionTable from "./WeaponSelectionTable";

interface Props {
    actor: Actor
    open: boolean
    onClose: () => void
}

export default function WeaponSelectionDialog(props: Props) {
    const {actor, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Weapon'}/>
            <DialogContent>
                <WeaponSelectionTable actor={actor}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}