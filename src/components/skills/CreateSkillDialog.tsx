import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import SkillService from "../../services/SkillService";
import {Path} from "../../services/Path";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function CreateSkillDialog(props: Props) {
    const { open, onClose } = props;
    const [ name, setName ] = useState('');
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        await SkillService.createSkill(name)
        navigate(Path.Skills + name)
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Skill</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
            </DialogContentText>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={handleCreate}>CREATE</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
