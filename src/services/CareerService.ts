import axios from 'axios';
import {Path} from './Path';
import Career from "../models/actor/player/Career";

export default class CareerService {

    static async createCareer(name: string) {
        return await axios.post(Path.Career + name);
    }

    static async getCareer(name: string): Promise<Career> {
        return await (await axios.get(Path.Career + name)).data;
    }

    static async getCareers(): Promise<Career[]> {
        return await (await axios.get(Path.Career)).data;
    }

    static async updateCareer(name: string, career: Career): Promise<Career> {
        return await axios.put(Path.Career + name, career);
    }
}