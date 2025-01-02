import {LoreType} from "../../../models/lore/Lore";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LorePath} from "../../../services/RootPath";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";
import OrganizationService from "../../../services/lore/OrganizationService";


interface Props {
    open: boolean
    onClose: () => void
    lore: LoreType
    path: LorePath
}

export default function LoreCreationDialog(props: Props) {
    const {open, onClose, lore, path} = props;
    const [name, setName] = useState('');
    let navigate = useNavigate();

    const handleCreate = async (): Promise<void> => {
        switch (lore) {
            case LoreType.ORGANIZATION:
                let organization = await OrganizationService.createOrganization(name);
                navigate(path + organization.id + '/view');
        }
        onClose();
    };

    const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {value} = event.target;
        setName(value);
    };

    const getTitle = (): string => {
        return 'Create ' + lore;
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogContentText>
                <TextField onChange={onNameChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions onClose={onClose} handleCreate={handleCreate}/>
        </Dialog>
    );
}