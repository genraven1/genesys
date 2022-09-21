import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Nemesis from "../../../models/actor/npc/Nemesis";
import TalentSelectionTable from "../TalentSelectionTable";

interface Props {
    nemesis: Nemesis
    open: boolean
    onClose: () => void
}

export default function NPCTalentSelectionDialog(props: Props) {
    const {nemesis, open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Add Talent
            </DialogTitle>
            <DialogContent>
                <TalentSelectionTable actor={nemesis}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}