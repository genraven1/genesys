import axios from "axios";
import {Path} from "./Path";
import Setting from "../models/Setting";

export default class SettingService {

    static async getCurrentSetting(): Promise<Setting> {
        return await (await axios.get(Path.Setting + 'current')).data;
    }

    static async setCurrentSetting(name: string): Promise<Setting> {
        return await (await axios.post(Path.Setting + 'current/' + name)).data;
    }

    static async getSettings(): Promise<Setting[]> {
        return await (await axios.get(Path.Setting)).data;
    }

    static async getSetting(id: number): Promise<Setting> {
        return await (await axios.get(Path.Setting + id)).data;
    }

    static async createSetting(name: string): Promise<Setting> {
        return await (await axios.post(Path.Setting + name)).data;
    }

    static async updateSetting(name: string, setting: Setting): Promise<Setting> {
        return await (await axios.put(Path.Setting + name, setting)).data;
    }
}