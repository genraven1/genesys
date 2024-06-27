import axios from "axios";
import {Path} from "./Path";
import Injury from "../models/Injury";

export default class InjuryService {
    static async createInjury(name: string): Promise<Injury> {
        return await fetch(`/injuries`, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getInjury(name: string): Promise<Injury> {
        return await (await axios.get(Path.Injury + name)).data;
    }

    static async updateInjury(name: string, injury: Injury): Promise<Injury> {
        return await (await axios.put(Path.Injury + name, injury)).data;
    }
}