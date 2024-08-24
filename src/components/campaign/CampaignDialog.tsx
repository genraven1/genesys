import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Dialog, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {CampaignPath} from "../../services/RootPath";
import {GenesysDialogActions} from "../common/dialog/GenesysDialogActions";
import CampaignService from "../../services/CampaignService";
import {useFetchAllCampaigns} from "./CampaignWorkflow";

interface Props {
    open: boolean
    onClose: () => void
}
export default function CampaignDialog(props: Props) {
    const {open,onClose} = props
    const [name,setName] = useState('')
    let navigate = useNavigate()

    const handleCreate = async (): Promise<void> => {
        let campaign = await CampaignService.createCampaign(name)
        let campaigns = useFetchAllCampaigns();
        if (campaigns.length === 1) {
            await CampaignService.setCurrentCampaign(String(campaign.campaign_id))
        }
        navigate(CampaignPath.Campaign + campaign.campaign_id)
        onClose()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target
        setName(value)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Name New Campaign</DialogTitle>
            <DialogContentText>
                <TextField onChange={onChange} value={name} required/>
            </DialogContentText>
            <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
        </Dialog>
    )
}