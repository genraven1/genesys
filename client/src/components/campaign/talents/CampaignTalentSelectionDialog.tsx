import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CampaignTalentSelectionTable from "./CampaignTalentSelectionTable";

interface Props {
    campaign_name: string
    open: boolean
    onClose: () => void
}

export default function CampaignTalentSelectionDialog(props: Props) {
    const {campaign_name, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Talent'}/>
            <DialogContent>
                <CampaignTalentSelectionTable campaign_name={campaign_name}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}