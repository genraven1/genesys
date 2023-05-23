import axios from "axios";
import {EquipmentPath} from "./Path";
import {Armor} from "../models/equipment/Armor";
import {Gear} from "../models/equipment/Gear";
import {Weapon} from "../models/equipment/Weapon";

export default class EquipmentService {

    static async createArmor(name: string): Promise<Armor> {
        return await (await axios.post( EquipmentPath.Armor + name)).data
    }

    static async getArmors(): Promise<Armor[]> {
        return await (await axios.get(EquipmentPath.Armor)).data
    }

    static async getArmorNames(): Promise<string[]> {
        return await (await axios.get(EquipmentPath.Armor + '/names')).data
    }

    static async getArmor(name: string): Promise<Armor> {
        return await (await axios.get(EquipmentPath.Armor + name)).data
    }

    static async updateArmor(name: string, armor: Armor): Promise<Armor> {
        return await (await axios.put(EquipmentPath.Armor + name, armor)).data
    }

    static async createWeapon(name: string): Promise<Weapon> {
        return await (await axios.post( EquipmentPath.Weapon + name)).data
    }

    static async getWeapons(): Promise<Weapon[]> {
        return await (await axios.get(EquipmentPath.Weapon)).data
    }

    static async getWeaponsNames(): Promise<string[]> {
        return await (await axios.get(EquipmentPath.Weapon + '/names')).data
    }

    static async getWeapon(name: string): Promise<Weapon> {
        return await (await axios.get(EquipmentPath.Weapon + name)).data
    }

    static async updateWeapon(name: string, weapon: Weapon): Promise<Weapon> {
        return await (await axios.put(EquipmentPath.Weapon + name, weapon)).data
    }

    static async createGear(name: string): Promise<Gear> {
        return await (await axios.post( EquipmentPath.Gear + name)).data
    }

    static async getGears(): Promise<Gear[]> {
        return await (await axios.get(EquipmentPath.Gear)).data
    }

    static async getGear(name: string): Promise<Gear> {
        return await (await axios.get(EquipmentPath.Gear + name)).data
    }

    static async updateGear(name: string, gear: Gear): Promise<Gear> {
        return await (await axios.put(EquipmentPath.Gear + name, gear)).data
    }
}