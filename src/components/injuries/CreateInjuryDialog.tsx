import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material"
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Path} from "../../services/Path";
import Injury from "../../models/Injury";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateInjuryDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    const [injury, setInjury] = useState<Injury>({} as Injury)
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        await fetch(`/injuries`, {method: "POST", body: JSON.stringify({...injury, name: name})})
            .then((res) => res.json())
            .then((data) => setInjury(data as Injury))
        navigate(Path.Injury + injury.id + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Critical Injury</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}
