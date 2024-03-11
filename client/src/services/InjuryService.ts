import axios from "axios";
import {Path} from "./Path";
import Injury from "../models/Injury";

export default class InjuryService {
    static async createInjury(name: string): Promise<Injury> {
        return await (await axios.post(Path.Injury + name)).data;
    }
}