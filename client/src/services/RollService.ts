import axios from "axios";
import Roll, {Results} from "../models/Roll";
import {Path} from "./Path";

export default class RollService {
    static async rollDice(roll: Roll): Promise<Results> {
        return await (await axios.post(Path.Roll, roll)).data;
    }
}