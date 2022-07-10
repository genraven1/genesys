import axios from "axios";
import {Path} from "./Path";
import {Armor} from "../models/equipment/Equipment";


export default class EquipmentService {

    static async createArmor(name: string): Promise<Armor> {
        return await axios.post( Path.Armor + name);
    }

    static async getArmors(): Promise<Armor[]> {
        return await (await axios.get(Path.Armor)).data;
    }

    static async getArmor(name: string): Promise<Armor> {
        return await (await axios.get(Path.Armor + name)).data;
    }

    static async updateArmor(name: string, armor: Armor): Promise<Armor> {
        return await axios.put(Path.Armor + name, armor);
    }
}