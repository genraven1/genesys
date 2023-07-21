import axios from "axios";
import {Path} from "./Path";
import Setting, {converter, CurrentSetting} from "../models/Setting";
import firebase from "firebase/compat";

export default class SettingService {

    static async getCurrentSetting(): Promise<CurrentSetting> {
        return (await firebase.firestore().collection('settings').withConverter(converter).doc('current').get()).data()! as CurrentSetting;
        // return await (await axios.get(Path.Setting + 'current')).data;
    }

    static async setCurrentSetting(name: string): Promise<Setting> {


        //return (await firebase.firestore().collection('settigns').withConverter(converter).doc('current').set()).data() as Setting
        return await (await axios.post(Path.Setting + 'current/' + name)).data;
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