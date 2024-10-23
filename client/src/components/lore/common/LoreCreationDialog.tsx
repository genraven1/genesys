import {LoreType} from "../../../models/lore/Lore";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LorePath} from "../../../../client/src/services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import LoreService from "../../../services/LoreService";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";


interface Props {
    open: boolean
    onClose: () => void
    lore: LoreType
    path: LorePath
}

export default function LoreCreationDialog(props: Props): JSX.Element {
    const {open,onClose,lore,path} = props
    const [ name, setName ] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        await LoreService.createLore(name, path)
        navigate(path + name + '/view')
        onClose()
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    const getTitle = ():string => {
        return 'Create ' + lore
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions onClose={onClose} handleCreate={handleCreate}/>
        </Dialog>
    )
}