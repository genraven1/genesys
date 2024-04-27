import CampaignSession from "../../../models/campaign/CampaignSession";
import {useState} from "react";
import {Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import * as React from "react";
import SessionDialog from "./SessionDialog";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import ActionsTableCell from "../../common/table/ActionsTableCell";
import {CampaignPath} from "../../../services/Path";


interface RowProps {
    session: CampaignSession
    campaignName: string
}

function Row(props: RowProps): JSX.Element {
    const {session, campaignName} = props

    return (
        <TableRow>
            <TypographyCenterTableCell value={session.name}/>
            <ActionsTableCell name={session.name} path={CampaignPath.Campaign + campaignName + CampaignPath.Session}/>
        </TableRow>
    )
}

interface Props {
    sessions: CampaignSession[];
    campaignName: string
}

export default function ViewAllSessions(props: Props) {
    const {sessions, campaignName} = props;
    const [openSessionCreationDialog, setOpenSessionCreationDialog] = useState(false)
    const headers = ['Name', 'View']

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Sessions'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenSessionCreationDialog(true)}>Create Session</Button>}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {sessions.map((session: CampaignSession) => (
                                <Row key={session.name} session={session} campaignName={campaignName}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openSessionCreationDialog && <SessionDialog open={openSessionCreationDialog}
                                                         onClose={(): void => setOpenSessionCreationDialog(false)}
                                                         campaignName={campaignName}/>}
        </Card>
    )

}