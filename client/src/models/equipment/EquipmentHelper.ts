import Equipment from "./Equipment";
import {Armor} from "./Armor";
import {Weapon} from "./Weapon";
import Quality from "../Quality";

export const renderPrice = (equipment: Equipment): string => {
    return equipment?.restricted!! ? equipment?.price!! + '(R)' : String(equipment?.price!!);
}

export const renderQualities = (equipment: Equipment): string => {
    let qualities = ''
    if (equipment?.qualities!!.length > 0) {
        let qualityList = equipment?.qualities!!.sort((a, b) => a.name.localeCompare(b.name))
        for (let i = 0; i < qualityList.length; i++) {
            const quality = qualityList[i];
            if (i !== qualityList.length - 1) {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks + ', ')
            } else {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks)
            }
        }
    } else {
        qualities = 'None'
    }
    return qualities
}

export const renderSoak = (armor: Armor): string => {
    return '+' + String(armor?.soak!!)
}

export const renderActorDamage = (weapon: Weapon, brawn: number): string => {
    return weapon?.brawn!! ? String(weapon?.damage!! + brawn) : String(weapon?.damage!!);
}

export const renderDamage = (weapon: Weapon): string => {
    return weapon?.brawn!! ? 'Brawn + ' + weapon?.damage!! : String(weapon?.damage!!);
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