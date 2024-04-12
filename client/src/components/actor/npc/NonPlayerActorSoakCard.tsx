import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import Actor from "../../../models/actor/Actor";
import {ArmorSlot} from "../../../models/equipment/Armor";

interface Props {
    actor: Actor,
}

export default function NonPlayerActorSoakCard(props: Props): JSX.Element {
    const {actor} = props;

    const calculateArmorSoak = () => {
        if (actor.armors === undefined || actor.armors.length === 0) {
            return 0;
        } else {
            let armor = actor.armors.filter((armor) => armor.slot === ArmorSlot.Body).pop()
            if (armor) {
                return armor.soak
            } else {
                return 0;
            }
        }
    }

    const renderSoak = () => {
        return String(actor.brawn + calculateArmorSoak())
    }

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Soak'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={renderSoak()}/>
                </CardContent>
            </Card>
        </Grid>
    )
}