import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import WeaponQualitySelectionTable from "./WeaponQualitySelectionTable";
import {Weapon} from "../../../../models/equipment/Weapon";

interface Props {
    weapon: Weapon
    open: boolean
    onClose: () => void
}

export default function WeaponQualitySelectionDialog(props: Props) {
    const {weapon, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Weapon Quality</DialogTitle>
            <DialogContent>
                <WeaponQualitySelectionTable weapon={weapon}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}