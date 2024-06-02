import {Fragment} from "react";
import {Card, CardContent, Grid} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {DefenseType} from "../../../models/actor/Defense";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import NonPlayerActor from "../../../models/actor/npc/NonPlayerActor";
import {ArmorSlot} from "../../../models/equipment/Armor";

interface Props {
    npc: NonPlayerActor;
}

export default function NonPlayerActorDefenseCard(props: Props) {
    const {npc} = props;

    const calculateArmorDefense = () => {
        if (npc.armors === undefined || npc.armors.length === 0) {
            return 0;
        } else {
            let armor = npc.armors.filter((armor) => armor.slot === ArmorSlot.Body).pop()
            if (armor) {
                return armor.defense
            } else {
                return 0;
            }
        }
    }

    const calculateMeleeDefense = () => {
        return String(calculateArmorDefense())
    }

    const calculateRangedDefense = () => {
        return String(calculateArmorDefense())
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