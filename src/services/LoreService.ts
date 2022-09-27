import axios from "axios";
import {LorePath} from "./Path";


export default class LoreService {

    static async createLore(name: string, path: LorePath): Promise<any> {
        return await axios.post(path + name);
    }
}