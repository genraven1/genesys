import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, TextField} from "@mui/material";
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
                navigate(Path.Rival + name + '/edit');
                break
            case NonPlayerCharacterType.Nemesis:
                await ActorService.createNemesis(name);
                navigate(Path.Nemesis + name + '/edit');
                break
        }
        onClose()
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value);
    }

    const getTitle = ():string => {
        return 'Create ' + type
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
                <Divider />
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
