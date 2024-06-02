import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import MinionArmorSelectionTable from "./MinionArmorSelectionTable";
import Minion from "../../../../../../models/actor/npc/Minion";

interface Props {
    minion: Minion
    open: boolean
    onClose: () => void
}

export default function MinionArmorSelectionDialog(props: Props) {
    const {minion, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Armor'}/>
            <DialogContent>
                <MinionArmorSelectionTable minion={minion}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}