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

    static async getArmor(id: number): Promise<Armor> {
        return await (await axios.get(EquipmentPath.Armor + id)).data
    }

    static async updateArmor(id: number, armor: Armor): Promise<Armor> {
        return await axios.put(EquipmentPath.Armor + id, armor)
    }

    static async createWeapon(name: string): Promise<Weapon> {
        return await (await axios.post( EquipmentPath.Weapon + name)).data
    }

    static async getWeapons(): Promise<Weapon[]> {
        return await (await axios.get(EquipmentPath.Weapon)).data
    }

    static async getWeapon(id: number): Promise<Weapon> {
        return await (await axios.get(EquipmentPath.Weapon + id)).data
    }

    static async updateWeapon(id: number, weapon: Weapon): Promise<Weapon> {
        return await axios.put(EquipmentPath.Weapon + id, weapon)
    }

    static async createGear(name: string): Promise<Gear> {
        return await (await axios.post( EquipmentPath.Gear + name)).data
    }

    static async getGears(): Promise<Gear[]> {
        return await (await axios.get(EquipmentPath.Gear)).data
    }

    static async getGear(id: number): Promise<Gear> {
        return await (await axios.get(EquipmentPath.Gear + id)).data
    }

    static async updateGear(id: number, gear: Gear): Promise<Gear> {
        return await axios.put(EquipmentPath.Gear + id, gear)
    }
}