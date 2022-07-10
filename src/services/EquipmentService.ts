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
}