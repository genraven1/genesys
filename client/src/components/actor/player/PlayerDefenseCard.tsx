import {DefenseType} from "../../../models/actor/Defense";
import Player from "../../../models/actor/player/Player";
import {Fragment} from "react";
import {ArmorSlot} from "../../../models/equipment/Armor";
import {Type} from "../../../models/common/Modifier";
import {WeaponSlot} from "../../../models/equipment/Weapon";
import {ViewFieldCard} from "../../common/ViewFieldCard";

interface Props {
    player: Player;
}

export default function PlayerDefenseCard(props: Props) {
    const {player} = props;

    const calculateWeaponMeleeDefense = (): number => {
        let defense = 0
        if (player.weapons === undefined || player.weapons.length === 0) {
            return defense
        } else {
            player.weapons.forEach((weapon) => {
                if (weapon.slot !== WeaponSlot.None) {
                    weapon.qualities.forEach((quality) => {
                        quality.modifiers.forEach(modifier => {
                            if (modifier.type === Type.IncreaseMeleeDefense) {
                                defense = quality.ranks * modifier.ranks;
                            }
                        })
                    })
                }
            })
        }
        return defense
    }

    const calculateWeaponRangedDefense = () => {
        let defense = 0
        if (player.weapons === undefined || player.weapons.length === 0) {
            return defense
        } else {
            player.weapons.forEach((weapon) => {
                if (weapon.slot !== WeaponSlot.None) {
                    weapon.qualities.forEach((quality) => {
                        quality.modifiers.forEach(modifier => {
                            if (modifier.type === Type.IncreaseRangedDefense) {
                                defense = modifier.ranks;
                            }
                        })
                    })
                }
            })
        }
        return defense
    }

    const calculateArchetypeMeleeDefense = () => {
        let defense = 0
        if (player.archetype === undefined || player.archetype.abilities === undefined || player.archetype.abilities.length === 0) {
            return defense;
        } else {
            player.archetype.abilities.forEach((ability) => {
                ability.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseMeleeDefense) {
                        defense = modifier.ranks;
                    }
                })
            })
        }
        return defense;
    }

    const calculateArchetypeRangedDefense = () => {
        let defense = 0
        if (player.archetype === undefined || player.archetype.abilities === undefined || player.archetype.abilities.length === 0) {
            return defense;
        } else {
            player.archetype.abilities.forEach((ability) => {
                ability.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseRangedDefense) {
                        defense = modifier.ranks;
                    }
                })
            })
        }
        return defense;
    }

    const calculateTalentMeleeDefense = () => {
        let defense = 0
        if (player.talents === undefined || player.talents.length === 0) {
            return defense;
        } else {
            player.talents.forEach((talent) => {
                talent.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseMeleeDefense) {
                        if (talent.ranked) {
                            defense = modifier.ranks * talent.ranks;
                        } else {
                            defense = modifier.ranks;
                        }
                    }
                })
            })
        }
        return defense;
    }

    const calculateTalentRangedDefense = () => {
        let defense = 0
        if (player.talents === undefined || player.talents.length === 0) {
            return defense;
        } else {
            player.talents.forEach((talent) => {
                talent.modifiers.forEach(modifier => {
                    if (modifier.type === Type.IncreaseRangedDefense) {
                        if (talent.ranked) {
                            defense = modifier.ranks * talent.ranks;
                        } else {
                            defense = modifier.ranks;
                        }
                    }
                })
            })
        }
        return defense;
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
        return String(calculateArmorDefense() + calculateTalentMeleeDefense() + calculateArchetypeMeleeDefense() + calculateWeaponMeleeDefense())
    }

    const calculateRangedDefense = () => {
        return String(calculateArmorDefense() + calculateTalentRangedDefense() + calculateArchetypeRangedDefense() + calculateWeaponRangedDefense())
    }

    return (
        <Fragment>
            <ViewFieldCard name={DefenseType.Melee} value={calculateMeleeDefense()}/>
            <ViewFieldCard name={DefenseType.Ranged} value={calculateRangedDefense()}/>
        </Fragment>
    )
}