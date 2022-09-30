import axios from "axios";
import {LorePath, Path} from "./Path";
import Organization from "../models/lore/Organization";
import Lore from "../models/lore/Lore";


export default class LoreService {

    static async createLore(name: string, path: LorePath): Promise<any> {
        return await axios.post(path + name);
    }

    static async getLore(name: string, path: LorePath): Promise<any> {
        return await axios.post(path + name);
    }

    static async getAllLore(): Promise<Lore[]> {
        return await axios.get(Path.Lore);
    }

    static async getAllLoreOfType(path: LorePath): Promise<any[]> {
        return (await axios.get(path)).data;
    }

    static async updateOrganization(name: string, organization: Organization): Promise<any> {
        return await axios.put(LorePath.Organization + name, organization);
    }
}