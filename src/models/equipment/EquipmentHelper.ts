import Equipment from "./Equipment";
import {Armor} from "./Armor";
import {Weapon} from "./Weapon";
import {EquipmentQuality} from "../Quality";

export const renderPrice = (equipment: Equipment): string => {
    let price = ''
    if (equipment?.restricted!!) {
        price = equipment?.price!! + '(R)'
    } else {
        price = String(equipment?.price!!)
    }
    return price
}

export const renderArmorQualities = (armor: Armor): string => {
    let qualities = ''
    if (armor?.qualities!!.length > 0) {
        let qualityList = armor.qualities.sort((a, b) => a.name.localeCompare(b.name))
        for (let i = 0; i < qualityList.length; i++){
            const quality = qualityList[i];
            if (i !== qualityList.length - 1) {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks + ', ')
            }
            else {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks)
            }
        }
    }
    else {qualities = 'None'}
    return qualities
}

export const renderQualities = (equipmentQualities: EquipmentQuality[]): string => {
    let qualities = ''
    if (equipmentQualities!!.length > 0) {
        let qualityList = equipmentQualities.sort((a, b) => a.name.localeCompare(b.name))
        for (let i = 0; i < qualityList.length; i++){
            const quality = qualityList[i];
            if (i !== qualityList.length - 1) {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks + ', ')
            }
            else {
                qualities = qualities.concat(quality.name + ' ' + quality.ranks)
            }
        }
    }
    else {qualities = 'None'}
    return qualities
}

export const renderSoak = (armor: Armor): string => {
    return '+' + String(armor?.soak!!)
}

export const renderActorDamage = (weapon: Weapon, brawn: number): string => {
    let damage = ''
    if (weapon?.brawn!!) {
        damage = String(weapon?.damage!! + brawn)
    } else {
        damage = String(weapon?.damage!!)
    }
    return damage
}

export const renderDamage = (weapon: Weapon): string => {
    let damage = ''
    if (weapon?.brawn!!) {damage = 'Brawn + ' + weapon?.damage!!}
    else {damage = String(weapon?.damage!!)}
    return damage
}