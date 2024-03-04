import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {Armor} from "../../../models/equipment/Armor";
import ArmorQualitySelectionTable from "./ArmorQualitySelectionTable";

interface Props {
    armor: Armor
    open: boolean
    onClose: () => void
}

export default function ArmorQualitySelectionDialog(props: Props) {
    const {armor, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Armor Quality</DialogTitle>
            <DialogContent>
                <ArmorQualitySelectionTable armor={armor}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}