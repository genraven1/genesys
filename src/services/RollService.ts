import axios from 'axios';
import {RootPath} from './RootPath';
import Roll, {Results} from "../models/Roll";

export default class RollService {

    static async roll(roll: Roll): Promise<Results> {
        return await (await axios.post(RootPath.Roll, roll)).data
    }
}