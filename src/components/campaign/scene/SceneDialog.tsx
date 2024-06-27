import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import CampaignService from "../../../services/CampaignService";
import {GenesysDialogActions} from "../../common/dialog/GenesysDialogActions";
import {CampaignPath} from "../../../services/RootPath";

interface Props {
    open: boolean
    onClose: () => void
    campaignName: string
    sessionName: string
}
export default function SceneDialog(props: Props): JSX.Element {
    const {open,onClose, campaignName, sessionName} = props
    const [name,setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let scene = await CampaignService.createSession(campaignName,sessionName)
        navigate(CampaignPath.Campaign + campaignName + CampaignPath.Session + sessionName + CampaignPath.Scene + scene.name + '/edit')
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Scene</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}