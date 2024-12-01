import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Player from '../../../models/actor/player/Player';
import ActorService from '../../../services/actor/ActorService';
import ActionsTableCell from '../../common/table/ActionsTableCell';
import {ActorPath} from "../../../services/RootPath";
import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
import {TypographyCenterTableCell} from "../../common/table/TypographyTableCell";
import {Card, CardContent} from "@mui/material";
import CreateActorDialog from "../../campaign/actor/common/CreateActorDialog";
import {ActorType} from "../../../models/actor/Actor";
import {useFetchCurrentCampaign} from "../../campaign/CampaignWorkflow";
import CenteredCardHeaderWithDialog from "../../common/card/header/CenteredCardHeaderWithDialog";

export default function ViewAllPlayers() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [openActorCreationDialog, setOpenActorCreationDialog] = useState(false);
    const headers = ['Name', 'View'];
    let campaign = useFetchCurrentCampaign();

    useEffect(() => {
        (async (): Promise<void> => {
            if (!campaign) return;
            setPlayers(await ActorService.getPlayers(campaign.id));
        })()
    }, [campaign])

    return (
        <Card>
            <CenteredCardHeaderWithDialog title={'View All Players'}
                                          onClick={(): void => setOpenActorCreationDialog(true)}
                                          buttonText={'Create Player'}/>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        <TableBody>
                            {players.map((player: Player) => (
                                <TableRow key={player.name}>
                                    <TypographyCenterTableCell value={player.name}/>
                                    <ActionsTableCell name={player.id} path={ActorPath.Player}/>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            {openActorCreationDialog && <CreateActorDialog open={openActorCreationDialog}
                                                           onClose={(): void => setOpenActorCreationDialog(false)}
                                                           actorType={ActorType.Player}/>}
        </Card>
    );
}