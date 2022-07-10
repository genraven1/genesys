import { Grid, Card } from "@mui/material";
import GenesysDescriptionTypography from "../../common/GenesysDescriptionTypography";

interface Props {
    rating: number
    type: string
}

export default function ViewRatingCard(props: Props): JSX.Element {
    let {rating,type} = props;

    return (
        <Grid item xs>
            <Card>
                <GenesysDescriptionTypography text={String(rating)}/>
            </Card>
        </Grid>
    )
}