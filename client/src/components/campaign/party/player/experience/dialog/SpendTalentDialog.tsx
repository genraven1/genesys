import Player from "../../../../../../models/actor/player/Player";
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, Card, CardContent, Dialog, DialogActions, DialogContent, Grid} from "@mui/material";
import PlayerService from "../../../../../../services/actor/PlayerService";
import {ActorTalent, Tier} from "../../../../../../models/Talent";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../../../common/typography/GenesysDescriptionTypography";
import AddIcon from "@mui/icons-material/Add";
import TierTalentDialog from "./TierTalentDialog";
import CenteredDialogTitle from "../../../../../common/dialog/CenteredDialogTitle";

interface Props {
    open: boolean
    onClose: () => void
    currentPlayer: Player
}

export default function SpendTalentDialog(props: Props) {
    const {open, onClose, currentPlayer} = props;
    const [player, setPlayer] = useState(currentPlayer);
    const firstTalents = player.talents.filter(talent => talent.tier === Tier.First);
    const secondTalents = player.talents.filter(talent => talent.tier === Tier.Second);
    const thirdTalents = player.talents.filter(talent => talent.tier === Tier.Third);
    const fourthTalents = player.talents.filter(talent => talent.tier === Tier.Fourth);
    const fifthTalents = player.talents.filter(talent => talent.tier === Tier.Fifth);
    const [openFirstDialog, setOpenFirstDialog] = useState(false);

    useEffect(() => {
        setPlayer(currentPlayer);
    }, [currentPlayer]);

    const handleCancel = async () => {
        setPlayer(await PlayerService.updatePlayer(currentPlayer));
        onClose();
    };

    const renderTalentCard = (talents: ActorTalent[], size: number) => {
        return (
            <Grid container justifyContent={"center"}>
                <Button variant='contained' color='primary' startIcon={<AddIcon/>} onClick={() => setOpenFirstDialog(true)}>
                    Add Talent
                </Button>
                {openFirstDialog && <TierTalentDialog open={openFirstDialog} onClose={() => setOpenFirstDialog(false)}
                                                      currentPlayer={player} tier={Tier.First}/>}
                <Grid container direction="column" spacing={2}>
                    {new Array(size).map((talent) => (
                        <Grid item key={talent.id}>
                            <Card>
                                <CenteredCardHeader title={talent.name}/>
                                <CardContent>
                                    <GenesysDescriptionTypography text={talent.summary}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {talents.map((talent) => (
                        <Grid item key={talent.id}>
                            <Card>
                                <CenteredCardHeader title={talent.name}/>
                                <CardContent>
                                    <GenesysDescriptionTypography text={talent.summary}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <CenteredDialogTitle title={'Spend Experience on Talent'}/>
            <DialogContent>
                <Grid container spacing={2} columns={5}>
                    <Grid item xs={1}>
                        {renderTalentCard(firstTalents, 0)}
                    </Grid>
                    {/*<Grid item xs={1}>*/}
                    {/*    {renderTalentCard(secondTalents, 1)}*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={1}>*/}
                    {/*    {renderTalentCard(thirdTalents, 2)}*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={1}>*/}
                    {/*    {renderTalentCard(fourthTalents, 3)}*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={1}>*/}
                    {/*    {renderTalentCard(fifthTalents, 4)}*/}
                    {/*</Grid>*/}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose} color="primary">Confirm</Button>
                <Button onClick={handleCancel} color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}