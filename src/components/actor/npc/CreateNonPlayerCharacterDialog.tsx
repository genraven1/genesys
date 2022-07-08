import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, TextField, Typography} from "@mui/material";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import ActorService from "../../../services/ActorService";
import {NonPlayerCharacterType} from "../../../models/actor/npc/NonPlayerCharacter";
import {Path} from "../../../services/Path";

interface Props {
    open: boolean;
    onClose: () => void;
    type: NonPlayerCharacterType
}

export default function CreateNonPlayerCharacterDialog(props: Props) {
    const { open, onClose, type } = props;
    const [ name, setName ] = useState('');
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case NonPlayerCharacterType.Minion:
                break
            case NonPlayerCharacterType.Rival:
                await ActorService.createRival(name);
                navigate(Path.Rival + name);
                break
            case NonPlayerCharacterType.Nemesis:
                await ActorService.createNemesis(name);
                navigate(Path.Nemesis + name);
                break
        }
        onClose()
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create NPC</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
                <Divider />
                <Typography>{type}</Typography>
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
