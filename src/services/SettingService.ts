import axios from "axios";
import {Path} from "./Path";
import Setting from "../models/Setting";

export default class SettingService {

    static async getSettings(): Promise<Setting[]> {
        return await (await axios.get(Path.Setting)).data;
    }

    static async getSettingNames(): Promise<string[]> {
        return await (await axios.get(Path.Setting + '/names')).data;
    }

    static async getSetting(name: string): Promise<Setting> {
        return await (await axios.get(Path.Setting + name)).data;
    }

    static async createSetting(name: string): Promise<Setting> {
        return await axios.post(Path.Setting + name);
    }

    static async updateSetting(name: string, talent: Setting): Promise<Setting> {
        return await axios.put(Path.Setting + name, talent);
    }
}