import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import Actor from "../../models/actor/Actor";
import {EquipmentSlot} from "../../models/equipment/Equipment";

interface Props {
    actor: Actor,
}

export default function SoakCard(props: Props): JSX.Element {
    const {actor} = props;

    const calculateArmorSoak = () => {
        if (actor.armor.length === 0) {
            return 0;
        } else {
            let armor = actor.armor.filter((armor) => armor.slot === EquipmentSlot.Body).pop()
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