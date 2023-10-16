import {getAllMinions} from "../utils/MinionHelper.ts";
import NonPlayerActor from "../models/NonPlayerActor.ts";

export const getAllNonPlayerActors = async (req, res) => {
    const nonPlayerActors = [] as NonPlayerActor[];
    const minions = await getAllMinions();
    for (const minion of minions) {
        nonPlayerActors.push(minion);
    }
    res.send(nonPlayerActors);
};