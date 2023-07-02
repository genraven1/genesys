import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField } from "@mui/material";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import {Path} from "../../services/Path";
import ArchetypeService from "../../services/ArchetypeService";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateArchetypeDialog(props: Props) {
    const {open,onClose} = props
    const [name,setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let archetype = await ArchetypeService.createArchetype(name)
        navigate(Path.Archetype + archetype?.name!! + '/view')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Archetype</DialogTitle>
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
