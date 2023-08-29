import {Card, CardActions, CardContent, Grid} from "@mui/material";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";
import {DefenseType} from "../../models/actor/Defense";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import {Fragment} from "react";

interface Props {
    melee: number
    ranged: number
    onMeleeChange: (value: number) => void
    onRangedChange: (value: number) => void
}

export default function EditDefenseCard(props: Props) {
    const {melee, ranged, onMeleeChange, onRangedChange} = props;

    return (
        <Fragment>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Melee}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={String(melee)}/>
                    </CardContent>
                    <CardActions>
                        <InputNumberRangeSelectField defaultValue={melee} min={0} max={5} onCommit={onMeleeChange}/>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs>
                <Card>
                    <CenteredCardHeader title={DefenseType.Ranged}/>
                    <CardContent>
                        <GenesysDescriptionTypography text={String(ranged)}/>
                    </CardContent>
                    <CardActions>
                        <InputNumberRangeSelectField defaultValue={ranged} min={0} max={5} onCommit={onRangedChange}/>
                    </CardActions>
                </Card>
            </Grid>
        </Fragment>
    )
}