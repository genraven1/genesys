import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Actor from "../../../../models/actor/Actor";
import ArmorSelectionTable from "./ArmorSelectionTable";

interface Props {
    actor: Actor
    open: boolean
    onClose: () => void
}

export default function ArmorSelectionDialog(props: Props) {
    const {actor, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Armor'}/>
            <DialogContent>
                <ArmorSelectionTable actor={actor}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}