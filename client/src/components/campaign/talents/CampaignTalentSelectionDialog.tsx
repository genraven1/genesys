import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CampaignTalentSelectionTable from "./CampaignTalentSelectionTable";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CampaignTalentSelectionDialog(props: Props) {
    const {open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Talent'}/>
            <DialogContent>
                <CampaignTalentSelectionTable/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}