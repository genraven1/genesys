import Party from "../../../models/campaign/Party";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import * as React from "react";
import PartyPlayerTable from "./PartyPlayerTable";
import PartyNonPlayerTable from "./PartyNonPlayerTable";

interface Props {
    party: Party
}

export default function PartyCard(props: Props) {
    const {party} = props;
    const headers = ['Name', 'View']

    return (
        <Card sx={{"width": 1}}>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Party'}
                action={<Button color='primary' variant='contained'>Import Player</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <PartyPlayerTable headers={headers} players={party.players}/>
                    <PartyNonPlayerTable headers={headers} npcs={party.npcs}/>
                </TableContainer>
            </CardContent>
        </Card>
    )
}