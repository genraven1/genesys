import {Dialog, DialogActions, DialogTitle, SelectChangeEvent} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import CampaignSelection from "./CampaignSelection";
import Campaign from "../../../models/campaign/Campaign";
import CampaignService from "../../../services/CampaignService";

interface Props {
    open: boolean
    onClose: () => void
    current: Campaign
}

export default function CampaignSelectionDialog(props: Props) {
    const {open, onClose, current} = props
    const [campaign, setCampaign] = useState<Campaign>(current)

    const getTitle = (): string => {
        return 'Current: ' + campaign.name
    }

    const onChange = async (event: SelectChangeEvent) => {
        setCampaign(await CampaignService.setCurrentCampaign(event.target.value))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{getTitle()}</DialogTitle>
            <DialogActions>
                <CampaignSelection onChange={onChange}/>
            </DialogActions>
        </Dialog>
    )
}