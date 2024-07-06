import Equipment from "./Equipment";
import {Armor} from "./Armor";
import {Weapon} from "./Weapon";
import Quality, {EquipmentQuality} from "../Quality";

export const renderPrice = (equipment: Equipment): string => {
    return equipment.restricted ? equipment.price + '(R)' : String(equipment.price);
}

export const renderQualities = (qualities: EquipmentQuality[]) => {
    if (qualities === undefined || qualities.length === 0) {
        return 'None'
    } else {
        let qualityList = qualities.sort((a, b) => a.name.localeCompare(b.name));
        let quals = '';
        for (let i = 0; i < qualityList.length; i++) {
            const quality = qualityList[i];
            if (i !== qualityList.length - 1) {
                quals = quals.concat(quality.name + ' ' + quality.ranks + ', ')
            } else {
                quals = quals.concat(quality.name + ' ' + quality.ranks)
            }
        }
        return quals
    }
}

export const renderSoak = (armor: Armor): string => {
    return '+' + String(armor?.soak!!)
}

export const renderActorDamage = (weapon: Weapon, brawn: number): string => {
    let damage: string
    if (weapon?.brawn!!) {
        damage = String(weapon?.damage!! + brawn)
    } else {
        damage = String(weapon?.damage!!)
    }
    return damage
}

export const renderDamage = (weapon: Weapon): string => {
    return weapon.brawn ? 'Brawn + ' + weapon.damage : String(weapon.damage);
}

export const renderUsable = (quality: Quality): string => {
    if (quality?.weapon!! === undefined && quality?.armor!! === undefined) {
        return ''
    }
    let usable: string
    if (quality?.weapon!! && !Boolean(quality?.armor!!)) {
        usable = 'Weapons'
    } else if (quality?.armor!! && !Boolean(quality?.weapon!!)) {
        usable = 'Armor'
    } else {
        usable = 'Weapons and Armor'
    }
    return usable
}