import {Card, CardContent, TableFooter} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import TableRow from "@mui/material/TableRow";
import ImportActorToPartySelection from "./ImportActorToPartySelection";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import Campaign from "../../../models/campaign/Campaign";
import ViewAllPlayers from "../../actor/player/ViewAllPlayers";

interface Props {

}

export default function PartyCard(props: Props) {

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Party'}/>
            <CardContent>
                <ViewAllPlayers/>
            </CardContent>
        </Card>
    )
}