import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CampaignSceneSelectionTable from "./CampaignSceneSelectionTable";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CampaignSceneSelectionDialog(props: Props) {
    const {open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Add Scene'}/>
            <DialogContent>
                <CampaignSceneSelectionTable/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}