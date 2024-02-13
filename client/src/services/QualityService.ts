import axios from "axios";
import {Path} from "./Path";
import Quality from "../models/Quality";

export default class QualityService {

    static async getQualities(): Promise<Quality[]> {
        return await (await axios.get(Path.Qualities)).data;
    }

    static async getQuality(name: string): Promise<Quality> {
        return await (await axios.get(Path.Qualities + name)).data;
    }

    static async createQuality(name: string): Promise<Quality> {
        return await (await axios.post(Path.Qualities + name)).data
    }

    static async updateQuality(id: number, quality: Quality): Promise<Quality> {
        return (await axios.put(Path.Qualities + id, quality)).data;
    }
}