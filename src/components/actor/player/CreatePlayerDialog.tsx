import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActorService from "../../../services/ActorService";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreatePlayerDialog(props: Props) {
    const { open, onClose } = props;
    const [ name, setName ] = useState('');
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        ActorService.createPlayer(name);
        navigate('/actors/players' + name);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Player</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
