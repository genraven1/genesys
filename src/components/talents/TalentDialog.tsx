import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TalentService from "../../services/TalentService";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function TalentDialog(props: Props) {
    const { open, onClose } = props;
    const [ name, setName ] = useState('');
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        TalentService.createTalent(name);
        navigate('/talents/' + name);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Name New Talent
            </DialogTitle>
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
