import {Card, CardActions, CardContent, Grid} from "@mui/material";
import InputNumberRangeSelectField from "../common/InputNumberRangeSelect";
import {DefenseType} from "../../models/actor/Defense";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";

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