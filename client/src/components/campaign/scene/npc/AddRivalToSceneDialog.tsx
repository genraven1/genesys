import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CampaignRivals from "../../npc/rival/CampaignRivals";

interface Props {
    open: boolean
    onClose: () => void
}

export default function AddRivalToSceneDialog(props: Props) {
    const {open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle title={'Add Rival'}/>
            <DialogContent>
                <CampaignRivals/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}