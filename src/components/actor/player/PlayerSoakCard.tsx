import {Card, CardContent, Grid} from "@mui/material";
import Player from "../../../models/actor/player/Player";
import {ArmorSlot} from "../../../models/equipment/Armor";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import {Type} from "../../../models/common/Modifier";

interface Props {
    player: Player,
}

export default function PlayerSoakCard(props: Props): JSX.Element {
    const {player} = props;

    const calculateTalentSoak = () => {
        if (player.talents === undefined || player.talents.length === 0) {
            return 0;
        }
        else {
            player.talents.forEach((talent) => {
                talent.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseSoak) {
                        if (talent.ranked) {
                            return modifier.ranks * talent.ranks;
                        } else {
                            return modifier.ranks;
                        }
                    }
                })
            })
        }
        return 0;
    }

    const calculateArmorSoak = () => {
        if (player.armors === undefined || player.armors.length === 0) {
            return 0;
        } else {
            let armor = player.armors.filter((armor) => armor.slot === ArmorSlot.Body).pop()
            if (armor) {
                return armor.soak
            } else {
                return 0;
            }
        }
    }

    const calculateTotalSoak = () => {
        return String(player.brawn + calculateArmorSoak() + calculateTalentSoak())
    }

    return (
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Soak'}/>
                <CardContent>
                    <GenesysDescriptionTypography text={calculateTotalSoak()}/>
                </CardContent>
            </Card>
        </Grid>
    )
}