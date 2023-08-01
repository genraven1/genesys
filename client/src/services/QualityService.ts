import axios from "axios";
import {Path} from "./Path";
import Quality from "../models/Quality";

export default class QualityService {

    static async getQualities(): Promise<Quality[]> {
        return await (await axios.get(Path.Qualities)).data;
    }

    static async getQualityNames(): Promise<string[]> {
        return await (await axios.get(Path.Qualities + '/names')).data;
    }

    static async getArmorQualityNames(): Promise<string[]> {
        return await (await axios.get(Path.Qualities + '/names/armor')).data;
    }

    static async getWeaponQualityNames(): Promise<string[]> {
        return await (await axios.get(Path.Qualities + '/names/weapon')).data;
    }

    static async getQuality(name: string): Promise<Quality> {
        return await (await axios.get(Path.Qualities + name)).data;
    }

    static async createQuality(name: string): Promise<Quality> {
        return await (await axios.post(Path.Qualities + name)).data
    }

    static async updateQuality(name: string, quality: Quality): Promise<Quality> {
        return await axios.put(Path.Qualities + name, quality);
    }
}