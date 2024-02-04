import axios from "axios";
import {Path} from "./Path";
import Setting from "../models/Setting";

export default class SettingService {

    static async getCurrentSetting(): Promise<Setting> {
        return await (await axios.get('/current/')).data;
    }

    static async setCurrentSetting(id: number): Promise<Setting> {
        return await (await axios.post('/current/' + id)).data;
    }

    static async getSettings(): Promise<Setting[]> {
        return await (await axios.get(Path.Setting)).data;
    }

    static async getSetting(name: string): Promise<Setting> {
        return await (await axios.get(Path.Setting + name)).data;
    }

    static async createSetting(name: string): Promise<Setting> {
        return await (await axios.post(Path.Setting + name)).data;
    }

    static async updateSetting(name: string, setting: Setting): Promise<Setting> {
        return await (await axios.put(Path.Setting + name, setting)).data;
    }
}