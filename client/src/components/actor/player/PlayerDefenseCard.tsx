import {Card, CardContent, Grid} from "@mui/material";
import {DefenseType} from "../../../models/actor/Defense";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import GenesysDescriptionTypography from "../../common/typography/GenesysDescriptionTypography";
import Player from "../../../models/actor/player/Player";
import {Fragment} from "react";
import {ArmorSlot} from "../../../models/equipment/Armor";
import {Type} from "../../../models/common/Modifier";

interface Props {
    player: Player;
}

export default function PlayerDefenseCard(props: Props) {
    const {player} = props;

    const calculateArchetypeMeleeDefense = () => {
        if (player.archetype === undefined || player.archetype.abilities === undefined || player.archetype.abilities.length === 0) {
            return 0;
        } else {
            player.archetype.abilities.forEach((ability) => {
                ability.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseMeleeDefense) {
                        return modifier.ranks;
                    }
                })
            })
        }
        return 0;
    }

    const calculateArchetypeRangedDefense = () => {
        if (player.archetype === undefined || player.archetype.abilities === undefined || player.archetype.abilities.length === 0) {
            return 0;
        } else {
            player.archetype.abilities.forEach((ability) => {
                ability.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseRangedDefense) {
                        return modifier.ranks;
                    }
                })
            })
        }
        return 0;
    }

    const calculateTalentMeleeDefense = () => {
        if (player.talents === undefined || player.talents.length === 0) {
            return 0;
        } else {
            player.talents.forEach((talent) => {
                talent.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseMeleeDefense) {
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

    const calculateTalentRangedDefense = () => {
        if (player.talents === undefined || player.talents.length === 0) {
            return 0;
        } else {
            player.talents.forEach((talent) => {
                talent.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseRangedDefense) {
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

    const calculateArmorDefense = () => {
        if (player.armors === undefined || player.armors.length === 0) {
            return 0;
        } else {
            let armor = player.armors.filter((armor) => armor.slot === ArmorSlot.Body).pop()
            if (armor) {
                return armor.defense
            } else {
                return 0;
            }
        }
    }

    const calculateMeleeDefense = () => {
        return String(calculateArmorDefense() + calculateTalentMeleeDefense() + calculateArchetypeMeleeDefense())
    }

    const calculateRangedDefense = () => {
        return String(calculateArmorDefense() + calculateTalentRangedDefense() + calculateArchetypeRangedDefense())
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