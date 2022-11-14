import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Actor from "../../../models/actor/Actor";
import TalentSelectionTable from "../TalentSelectionTable";

interface Props {
    actor: Actor
    open: boolean
    onClose: () => void
}

export default function TalentSelectionDialog(props: Props) {
    const {actor, open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add Talent
            </DialogTitle>
            <DialogContent>
                <TalentSelectionTable actor={actor}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}