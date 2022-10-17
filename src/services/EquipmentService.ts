import axios from "axios";
import {EquipmentPath} from "./Path";
import {Weapon, Armor} from "../models/equipment/Equipment";

export default class EquipmentService {

    static async createArmor(name: string): Promise<Armor> {
        return await axios.post( EquipmentPath.Armor + name)
    }

    static async getArmors(): Promise<Armor[]> {
        return await (await axios.get(EquipmentPath.Armor)).data
    }

    static async getArmor(name: string): Promise<Armor> {
        return await (await axios.get(EquipmentPath.Armor + name)).data
    }

    static async updateArmor(name: string, armor: Armor): Promise<Armor> {
        return await axios.put(EquipmentPath.Armor + name, armor)
    }

    static async createWeapon(name: string): Promise<Weapon> {
        return await axios.post( EquipmentPath.Weapon + name)
    }

    static async getWeapons(): Promise<Weapon[]> {
        return await (await axios.get(EquipmentPath.Weapon)).data
    }

    static async getWeapon(name: string): Promise<Weapon> {
        return await (await axios.get(EquipmentPath.Weapon + name)).data
    }

    static async updateWeapon(name: string, weapon: Weapon): Promise<Weapon> {
        return await axios.put(EquipmentPath.Weapon + name, weapon)
    }
}