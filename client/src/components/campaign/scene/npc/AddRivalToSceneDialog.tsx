import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EnemySceneRivals from "./EnemySceneRivals";

interface Props {
    id: string
    open: boolean
    onClose: () => void
}

export default function AddRivalToSceneDialog(props: Props) {
    const {id, open, onClose} = props;

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle title={'Add Rival'}/>
            <DialogContent>
                <EnemySceneRivals id={id}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    );
}