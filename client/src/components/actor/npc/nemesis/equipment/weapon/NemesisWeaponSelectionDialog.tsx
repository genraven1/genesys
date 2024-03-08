import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import NemesisWeaponSelectionTable from "./NemesisWeaponSelectionTable";
import Nemesis from "../../../../../../models/actor/npc/Nemesis";

interface Props {
    nemesis: Nemesis
    open: boolean
    onClose: () => void
}

export default function NemesisWeaponSelectionDialog(props: Props) {
    const {nemesis, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Weapon'}/>
            <DialogContent>
                <NemesisWeaponSelectionTable nemesis={nemesis}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}