import {Card, CardContent, Grid} from "@mui/material";
import {DefenseType} from "../../models/actor/Defense";
import {Fragment} from "react";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

interface Props {
    melee: number
    ranged: number
}

export default function ViewDefenseCard(props: Props) {
    const {melee, ranged} = props;

    return (
        <Fragment>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Melee}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={String(melee)}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Ranged}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={String(ranged)}/>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}