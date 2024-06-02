import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import NemesisTalentSelectionTable from "./NemesisTalentSelectionTable";
import Nemesis from "../../../../../models/actor/npc/Nemesis";

interface Props {
    nemesis: Nemesis
    open: boolean
    onClose: () => void
}

export default function NemesisTalentSelectionDialog(props: Props) {
    const {nemesis, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Talent'}/>
            <DialogContent>
                <NemesisTalentSelectionTable nemesis={nemesis}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}