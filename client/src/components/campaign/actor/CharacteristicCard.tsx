import {Grid, Card, CardActions, CardContent} from "@mui/material";
import {CharacteristicType} from "../../../models/actor/Characteristic";
import InputNumberRangeSelectField from "../../common/InputNumberRangeSelect";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";

interface EditProps {
    characteristic: number,
    type: CharacteristicType,
    onChange: (value: number) => void,
}

export function EditCharacteristicCard(props: EditProps): JSX.Element {
    const { characteristic, type, onChange } = props;

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={type}/>
                <CardContent>
                    <GenesysDescriptionTypography text={String(characteristic)}/>
                </CardContent>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={characteristic} min={1} max={6} onCommit={(value: number): void => { onChange(value) }} />
                </CardActions>
            </Card>
        </Grid>
    )
}