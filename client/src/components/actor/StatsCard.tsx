import {StatsType} from "../../models/actor/Stats";
import {Card, CardActions, CardContent, Grid} from "@mui/material";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

interface EditProps {
    stats: number,
    type: StatsType,
    onChange: (value: number) => void
}

export function EditStatsCard(props: EditProps) {
    const { stats, type, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type + ' Threshold'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(stats)}/>
                </CardContent>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={stats} min={1} max={25} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}

interface ViewProps {
    stats: number,
    type: StatsType
}

export function ViewStatsCard(props: ViewProps) {
    const { stats, type } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type + ' Threshold'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(stats)}/>
                </CardContent>
            </Card>
        </Grid>
    )
}