import axios from "axios";
import {RootPath} from "./RootPath";
import Setting from "../models/Setting";

export default class SettingService {

    static async getCurrentSetting(): Promise<Setting> {
        return await (await axios.get('/current/')).data;
    }

    static async setCurrentSetting(name: string): Promise<Setting> {
        return await (await axios.post('/current/' + name)).data;
    }

    static async removeCurrentSetting(): Promise<Setting> {
        return await (await axios.delete('/current/')).data;
    }

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