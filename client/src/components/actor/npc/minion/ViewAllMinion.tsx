import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fragment, useEffect, useState } from 'react';
import * as React from 'react';
import ActorService from '../../../../services/ActorService'
import ActionsTableCell from "../../../common/table/ActionsTableCell";
import Minion from "../../../../models/actor/npc/Minion";
import {Button, Card, CardContent, CardHeader} from "@mui/material";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import {ActorType} from "../../../../models/actor/Actor";
import {ActorPath} from "../../../../services/RootPath";
import CreateActorDialog from "../../common/CreateActorDialog";
import {useFetchCurrentCampaign} from "../../../campaign/CampaignWorkflow";

interface Props {
    minion: Minion
}

function Row(props: Props) {
    const { minion } = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TypographyCenterTableCell value={minion.name}/>
                <ActionsTableCell name={minion.id} path={ActorPath.Minion}/>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table>
                                <TableBody>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default function ViewAllMinions() {
    const [minions, setMinions] = useState<Minion[]>([]);
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false);
    let campaign = useFetchCurrentCampaign();
    const headers = ['Name', 'View'];

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setMinions(await ActorService.getMinions(campaign.id));
        })()
    }, [campaign]);

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'View All Minions'}
                action={<Button color='primary' variant='contained'
                                onClick={(): void => setOpenActorCreationDialog(true)}>Create Minion</Button>}>
            </CardHeader>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {minions.map((minion: Minion) => (
                                <Row key={minion.name} minion={minion} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog}
                                                           onClose={(): void => setOpenActorCreationDialog(false)}
                                                           actorType={ActorType.Minion}/>}
        </Card>
    )
}