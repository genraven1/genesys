import axios from "axios";
import {RootPath} from "./RootPath";
import Quality from "../models/Quality";

export default class QualityService {

    static async getQualities(): Promise<Quality[]> {
        return await (await axios.get(RootPath.Qualities)).data;
    }

    static async getQuality(name: string): Promise<Quality> {
        return await (await axios.get(RootPath.Qualities + name)).data;
    }

    static async createQuality(name: string): Promise<Quality> {
        return await (await axios.post(RootPath.Qualities + name)).data
    }

    static async updateQuality(name: string, quality: Quality): Promise<Quality> {
        return (await axios.put(RootPath.Qualities + name, quality)).data;
    }
}