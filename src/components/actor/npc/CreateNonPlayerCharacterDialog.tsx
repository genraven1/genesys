import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, Divider, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import ActorService from "../../../services/ActorService";
import {NonPlayerCharacterType} from "../../../models/actor/npc/NonPlayerCharacter";
import InputSelectField from "../../input/InputSelectField";
import {Path} from "../../../services/Path";

const NPC_OPTIONS = npcOptions()

function npcOptions() {
    const array = [];

    for (const [key, value] of Object.entries(NonPlayerCharacterType)) {
        if (!Number.isNaN(Number(key))) {
            continue;
        }
        array.push({ value: key, label: value });
    }
    return array;
}

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateNonPlayerCharacterDialog(props: Props) {
    const { open, onClose } = props;
    const [ name, setName ] = useState('');
    const [ type, setType ] = useState(NonPlayerCharacterType.Nemesis)
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        switch (type) {
            case NonPlayerCharacterType.Minion:
            case NonPlayerCharacterType.Rival:
                break
            case NonPlayerCharacterType.Nemesis:
                await ActorService.createNemesis(name);
                navigate(Path.Nemesis + name);
                break
        }
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value);
    }

    const onTypeChange = (value: string): void => {
        if (NonPlayerCharacterType.Nemesis === value || NonPlayerCharacterType.Rival === value || NonPlayerCharacterType.Minion === value) {
            setType(value)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create NPC</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
                <Divider />
                <InputSelectField defaultValue={NonPlayerCharacterType.Nemesis} options={NPC_OPTIONS} onCommit={(value: string): void => { onTypeChange(value) }} />
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
