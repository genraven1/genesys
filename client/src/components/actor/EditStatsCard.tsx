import {StatsType} from "../../models/actor/Stats";
import {Card, CardActions, CardContent, Grid} from "@mui/material";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

interface Props {
    stat: number,
    type: StatsType,
    onChange: (value: number) => void
}

export default function EditStatsCard(props: Props) {
    const { stat, type, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type + ' Threshold'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(stat)}/>
                </CardContent>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={stat!!} min={1} max={25} onCommit={onChange} />
                </CardActions>
            </Card>
        </Grid>
    )
}