import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";

interface Props {
    open: boolean
    onClose: () => void
}

export default function ImportPlayerDialog(props: Props) {
    const { open, onClose } = props

    const onImport = () => {

    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{'Import Player'}</DialogTitle>
            <DialogContent>

            </DialogContent>
            <GenesysDialogActions handleCreate={onImport} onClose={onClose}/>
        </Dialog>
    )
}