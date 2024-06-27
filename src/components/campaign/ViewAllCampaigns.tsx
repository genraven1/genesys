import {useEffect, useState} from "react";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import {TypographyCenterTableCell} from "../common/table/TypographyTableCell";
import {ViewActionTableCell} from "../common/table/ActionsTableCell";
import {CampaignPath} from "../../services/RootPath";
import Campaign from "../../models/campaign/Campaign";
import CampaignService from "../../services/CampaignService";
import {renderSingleRowTableHeader} from "../common/table/TableRenders";
import CampaignDialog from "./CampaignDialog";

interface Props {
    campaign: Campaign
}

function Row(props: Props) {
    const {campaign} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={campaign.name}/>
            <ViewActionTableCell id={campaign.campaign_id} path={CampaignPath.Campaign}/>
        </TableRow>
    )
}

export default function ViewAllCampaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [openCampaignCreationDialog, setOpenCampaignCreationDialog] = useState(false)
    const headers = ['Name', 'View']

    useEffect(() => {
        (async (): Promise<void> => {
            setCampaigns(await CampaignService.getAllCampaigns())
        })()
    }, [setCampaigns])

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Campaigns'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenCampaignCreationDialog(true)}>Create Campaign</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {(campaigns || []).map((campaign: Campaign) => (
                                <Row key={campaign.name} campaign={campaign}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openCampaignCreationDialog && <CampaignDialog open={openCampaignCreationDialog}
                                                           onClose={(): void => setOpenCampaignCreationDialog(false)}/>}
        </Card>
    )
}