import {Card, CardActions, CardContent, Grid} from "@mui/material";
import InputNumberRangeSelectField from "../../common/InputNumberRangeSelect";
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

interface EditProps {
    defense: number
    type: DefenseType
    onChange: (value: number) => void
}

export function EditDefenseCard(props: EditProps) {
    const { defense, type, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(defense)}/>
                </CardContent>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={defense} min={0} max={5} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}

interface ViewProps {
    defense: number
    type: DefenseType
}

export function ViewDefenseCard(props: ViewProps) {
    const { defense, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(defense)}/>
                </CardContent>
            </Card>
        </Grid>
    )
}