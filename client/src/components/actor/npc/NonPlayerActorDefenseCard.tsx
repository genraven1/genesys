import {Fragment} from "react";
import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {DefenseType} from "../../../models/actor/Defense";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import NonPlayerActor from "../../../models/actor/npc/NonPlayerActor";

interface Props {
    npc: NonPlayerActor;
}

export default function NonPlayerActorDefenseCard(props: Props) {
    const {npc} = props;

    const calculateMeleeDefense = () => {
        return String(npc.melee)
    }

    const calculateRangedDefense = () => {
        return String(npc.ranged)
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