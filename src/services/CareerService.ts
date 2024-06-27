import axios from "axios";
import {RootPath} from "./RootPath";
import Career from "../models/actor/player/Career";

export default class careerService {
    static async createCareer(name: string): Promise<Career> {
        return await (await axios.post(RootPath.Career + name)).data;
    }

    static async getCareer(name: string): Promise<Career> {
        return await (await axios.get(RootPath.Career + name)).data;
    }

    static async updateCareer(name: string, career: Career): Promise<Career> {
        return await (await axios.put(RootPath.Career + name, career)).data;
    }

    static async getCareers(): Promise<Career[]> {
        return await (await axios.get(RootPath.Career)).data;
    }
}