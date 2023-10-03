import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, TextField } from "@mui/material";
import {ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import SettingService from "../../services/SettingService";
import {Path} from "../../services/Path";

interface Props {
    open: boolean
    onClose: () => void
}

export default function SettingDialog(props: Props) {
    const {open,onClose} = props
    const [name,setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let setting = await SettingService.createSetting(name)
        navigate(Path.Setting + setting?.id!!  + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Setting</DialogTitle>
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
