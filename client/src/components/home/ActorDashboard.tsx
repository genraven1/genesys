import {ActorPath} from "../../services/Path";
import {Card, CardContent, Grid} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import CreateActorDialog from "../actor/common/CreateActorDialog";
import ExpansionList from "../navigation/ExpansionList";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import {ActorType} from "../../models/actor/Actor";

export default function ActorDashboard() {
    const [openMinionCreationDialog, setOpenMinionCreationDialog] = useState(false)
    const [openRivalCreationDialog, setOpenRivalCreationDialog] = useState(false)
    const [openNemesisCreationDialog, setOpenNemesisCreationDialog] = useState(false)
    const [openPlayerCreationDialog, setOpenPlayerCreationDialog] = useState(false)

    return (
        <Card>
            <CenteredCardHeader title={'Actor MainDashboard'}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <ExpansionList header={'View Minions'} viewTitle={'View Minions'} to={ActorPath.Minion}
                                   dialogTitle={'Create Minions'}
                                   onClick={(): void => setOpenMinionCreationDialog(true)}/>
                    <ExpansionList header={'View Rivals'} viewTitle={'View Rivals'} to={ActorPath.Rival}
                                   dialogTitle={'Create Rival'}
                                   onClick={(): void => setOpenRivalCreationDialog(true)}/>
                    <ExpansionList header={'View Nemeses'} viewTitle={'View Nemeses'} to={ActorPath.Nemesis}
                                   dialogTitle={'Create Nemesis'}
                                   onClick={(): void => setOpenNemesisCreationDialog(true)}/>
                    <ExpansionList header={'View Players'} viewTitle={'View Players'} to={ActorPath.Player}
                                   dialogTitle={'Create Player'}
                                   onClick={(): void => setOpenPlayerCreationDialog(true)}/>
                </Grid>
            </CardContent>
            {openMinionCreationDialog && <CreateActorDialog open={openMinionCreationDialog}
                                                            onClose={(): void => setOpenMinionCreationDialog(false)}
                                                            actorType={ActorType.Minion}/>}
            {openRivalCreationDialog && <CreateActorDialog open={openRivalCreationDialog}
                                                           onClose={(): void => setOpenRivalCreationDialog(false)}
                                                           actorType={ActorType.Rival}/>}
            {openNemesisCreationDialog && <CreateActorDialog open={openNemesisCreationDialog}
                                                             onClose={(): void => setOpenNemesisCreationDialog(false)}
                                                             actorType={ActorType.Nemesis}/>}
            {openPlayerCreationDialog && <CreateActorDialog open={openPlayerCreationDialog}
                                                            onClose={(): void => setOpenPlayerCreationDialog(false)}
                                                            actorType={ActorType.Player}/>}
        </Card>
    )
}