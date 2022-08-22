import axios from "axios";
import {Path} from "./Path";
import {Armor} from "../models/equipment/Equipment";

const fs = require('fs');

export default class EquipmentService {

    static async createArmor(name: string): Promise<Armor> {
        return await axios.post( Path.Armor + name);
    }

    static async getArmors(): Promise<Armor[]> {
        let armors = [] as Armor[]
        let armorsFilenames = fs.readdirSync('mock/armor', {withFileTypes: true})
            .filter((item: { isDirectory: () => any; }) => !item.isDirectory())
            .map((item: { name: any; }) => item.name)
        for (const armorName in armorsFilenames) {
            armors.push(await this.getArmor(armorName))
        }
        return armors
    }

    static async getArmor(name: string): Promise<Armor> {
        let obj;
        fs.readFile('mock/armor' + name + '.json', 'utf8', function readFileCallback(err: any, data: string) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
            }
        })
        return JSON.stringify(obj) as unknown as Armor
    }

    static async updateArmor(name: string, armor: Armor): Promise<Armor> {
        return await axios.put(Path.Armor + name, armor);
    }
}