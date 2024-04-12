import {Card, CardContent, Grid} from "@mui/material";
import {DefenseType} from "../../../models/actor/Defense";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import Player from "../../../models/actor/player/Player";
import {Fragment} from "react";

interface Props {
    player: Player;
}

export default function PlayerDefenseCard(props: Props) {
    const {player} = props;

    const calculateMeleeDefense = () => {
        return String(player.melee)
    }

    const calculateRangedDefense = () => {
        return String(player.ranged)
    }

    return (
        <Fragment>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Melee}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={calculateMeleeDefense()}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Ranged}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={calculateRangedDefense()}/>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}