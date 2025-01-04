import {Button, DialogActions} from "@mui/material";

interface Props {
    handleCreate: () => void
    onClose: () => void
}

export function GenesysDialogActions(props: Props) {
    const { handleCreate, onClose } = props;
    return (
        <DialogActions>
            <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
            <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
        </DialogActions>
    );
}