import {Button, Card, CardContent, Grid} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TierTalentDialog from "./TierTalentDialog";
import {Tier} from "../../../../../../models/Talent";
import CenteredCardHeader from "../../../../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../../../../common/typography/GenesysDescriptionTypography";
import * as React from "react";
import {useState} from "react";
import Player from "../../../../../../models/actor/player/Player";

interface Props {
    player: Player
    size: number
}

export default function TalentDialogCard(props: Props) {
    const {player, size} = props;
    const [openTalentDialog, setOPenTalentDialog] = useState(false);

    return (
        <Grid container justifyContent={"center"}>
            <Button variant='contained' color='primary' startIcon={<AddIcon/>}
                    onClick={() => setOPenTalentDialog(true)}>
                Add Talent
            </Button>
            {openTalentDialog && <TierTalentDialog open={openTalentDialog} onClose={() => setOPenTalentDialog(false)}
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
                {player.talents.map((talent) => (
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
}