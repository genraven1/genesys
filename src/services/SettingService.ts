import axios from "axios";
import {RootPath} from "./RootPath";
import Setting from "../models/Setting";

export default class SettingService {

    static async getSettings(): Promise<Setting[]> {
        return await (await axios.get(RootPath.Setting)).data;
    }

    static async getSetting(name: string): Promise<Setting> {
        return await (await axios.get(RootPath.Setting + name)).data;
    }

    static async createSetting(name: string): Promise<Setting> {
        return await (await axios.post(RootPath.Setting + name)).data;
    }

    static async updateSetting(name: string, setting: Setting): Promise<Setting> {
        return await (await axios.put(RootPath.Setting + name, setting)).data;
    }
}