import NonPlayerActor from "../../client/src/models/actor/npc/NonPlayerActor.ts";
import {getAllMinions} from "../utils/MinionHelper.ts";
import { getAllRivals } from "../utils/RivalHelper.ts";

export const getAllNonPlayerActors = async (req, res) => {
    const nonPlayerActors = [] as NonPlayerActor[];
    const minions = await getAllMinions();
    for (const minion of minions) {
        nonPlayerActors.push(minion);
    }
    const rivals = await getAllRivals();
    for (const rival of rivals) {
        nonPlayerActors.push(rival);
    }
    res.send(nonPlayerActors);
};