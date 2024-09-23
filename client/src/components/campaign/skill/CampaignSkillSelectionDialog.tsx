import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CampaignSkillSelectionTable from "./CampaignSkillSelectionTable";

interface Props {
    campaign_name: string
    open: boolean
    onClose: () => void
}

export default function CampaignSkillSelectionDialog(props: Props) {
    const {campaign_name, open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Skill'}/>
            <DialogContent>
                <CampaignSkillSelectionTable campaign_name={campaign_name}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}