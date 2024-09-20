import axios from 'axios';
import {RootPath} from './Path';
import Roll, {Results} from "../models/Roll";

export default class RollService {

    static async roll(roll: Roll): Promise<Results> {
        return await (await axios.post(RootPath.Roll, roll)).data
    }
}