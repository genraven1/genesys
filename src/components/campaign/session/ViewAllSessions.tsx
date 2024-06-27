import CampaignSession from "../../../models/campaign/CampaignSession";
import {Fragment, useState} from "react";
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
import {CampaignPath} from "../../../services/RootPath";
import {useLocation} from "react-router-dom";


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
    const pathname = useLocation().pathname

    const renderButton = (): JSX.Element => {
        if (pathname.endsWith('/edit')) {
            return (
                <Fragment>
                    <Button color='primary' variant='contained'
                            onClick={(): void => setOpenSessionCreationDialog(true)}>Create Session</Button>
                    {openSessionCreationDialog && <SessionDialog open={openSessionCreationDialog}
                                                                 onClose={(): void => setOpenSessionCreationDialog(false)}
                                                                 campaignName={campaignName}/>}
                </Fragment>
            )
        } else {
            return <Fragment/>
        }
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Sessions'}
                action={renderButton()}>
            </CardHeader>
            <Divider/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {(sessions || []).map((session: CampaignSession) => (
                                <Row key={session.name} session={session} campaignName={campaignName}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )

}