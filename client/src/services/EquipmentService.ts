import axios from "axios";
import {EquipmentPath} from "./Path";
import {Armor} from "../models/equipment/Armor";
import {Gear} from "../models/equipment/Gear";
import {Weapon} from "../models/equipment/Weapon";
import Quality from "../models/Quality";

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
        return await (await axios.put(EquipmentPath.Armor + id, armor)).data
    }

    static async addArmorQuality(id: number, quality: Quality): Promise<Armor> {
        return await (await axios.put(EquipmentPath.Armor + id + '/quality', quality)).data;
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
        return await (await axios.put(EquipmentPath.Weapon + id, weapon)).data
    }

    static async addWeaponQuality(id: number, quality: Quality): Promise<Weapon> {
        return await (await axios.put(EquipmentPath.Weapon + id + '/quality', quality)).data;
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