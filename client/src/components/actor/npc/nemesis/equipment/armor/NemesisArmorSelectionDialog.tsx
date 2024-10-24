import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Nemesis from "../../../../../../models/actor/npc/Nemesis";
import NemesisArmorSelectionTable from "./NemesisArmorSelectionTable";

interface Props {
    nemesis: Nemesis
    open: boolean
    onClose: () => void
}

export default function NemesisArmorSelectionDialog(props: Props) {
    const {nemesis, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Armor'}/>
            <DialogContent>
                <NemesisArmorSelectionTable nemesis={nemesis}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}