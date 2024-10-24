import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CampaignSkillSelectionTable from "./CampaignSkillSelectionTable";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CampaignSkillSelectionDialog(props: Props) {
    const {open, onClose} = props

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Skill'}/>
            <DialogContent>
                <CampaignSkillSelectionTable/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}