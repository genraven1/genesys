import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import TalentService from "../../services/TalentService";
import {RootPath} from "../../services/RootPath";
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CreateTalentDialog(props: Props) {
    const {open, onClose} = props
    const [name, setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let talent = await TalentService.createTalent(name)
        navigate(RootPath.Talent + talent.talent_id + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Talent</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}
