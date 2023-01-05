import {Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Path} from "../../services/Path";
import CareerService from "../../services/CareerService";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateCareerDialog(props: Props) {
    const { open, onClose } = props
    const [ name, setName ] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        await CareerService.createCareer(name)
        navigate(Path.Career + name  + '/view')
        onClose()
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Career</DialogTitle>
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
