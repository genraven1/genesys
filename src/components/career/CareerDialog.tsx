import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {RootPath} from "../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CareerService from "../../services/CareerService";
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";
import {useFetchCurrentSetting} from "../setting/SettingWorkflow";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CareerDialog(props: Props) {
    const {open,onClose} = props
    const [name,setName] = useState('')
    let current = useFetchCurrentSetting()
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let career = await CareerService.createCareer(name)
        career.settings = career.settings.concat(current)
        await CareerService.updateCareer(career.name, career)
        navigate(RootPath.Career + career?.name!! + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Career</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}