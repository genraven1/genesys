import Campaign from "../../../models/campaign/Campaign";
import React, {useState} from "react";
import {Button, Card, CardContent, Table, TableContainer, TableFooter} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import AddIcon from "@mui/icons-material/Add";
import CampaignSession from "../../../models/campaign/CampaignSession";
import CampaignService from "../../../services/CampaignService";

interface Props {
    camp: Campaign
}

export default function ViewSessions(props: Props) {
    const {camp} = props;
    const [campaign, setCampaign] = useState(camp);
    const headers = ['Name', 'View'];

    const addRow = async () => {
        setCampaign({...campaign, sessions: [...campaign.sessions, {} as CampaignSession]});
    };

    return (
        <Card>
            <CenteredCardHeader title={'Sessions'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {campaign.sessions.map((session, index) => (
                                <TableRow key={index}>

                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow key={'Footer'}>
                                <Button variant='contained' color='primary' onClick={addRow} startIcon={<AddIcon/>}>Add
                                    Quality</Button>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}