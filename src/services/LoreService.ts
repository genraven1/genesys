import axios from "axios";
import {LorePath, RootPath} from "./RootPath";
import {Organization} from "../models/lore/Organization";
import Lore from "../models/lore/Lore";


export default class LoreService {

    static async createLore(name: string, path: LorePath): Promise<any> {
        return await axios.post(path + name);
    }

    static async getLore(name: string, path: LorePath): Promise<any> {
        return (await axios.get(path + name)).data
    }

    static async getAllLore(): Promise<Lore[]> {
        return (await axios.get(RootPath.Lore)).data
    }

    static async getAllLoreOfType(path: LorePath): Promise<any[]> {
        return (await axios.get(path)).data;
    }

    static async updateOrganization(name: string, organization: Organization): Promise<any> {
        return await axios.put(LorePath.Organization + name, organization);
    }
}