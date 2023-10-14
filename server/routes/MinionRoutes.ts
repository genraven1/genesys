import Router from "express-promise-router";
import {MINION_PATH} from "../utils/Path.ts";
import {
    createMinion,
    getAllMinions,
    getMinion,
    updateMinion, updateMinionSkill,
} from "../controller/MinionController.ts";

export const minionRouter = Router();

minionRouter.route(MINION_PATH)
    .get(getAllMinions)

minionRouter.route(`${MINION_PATH}:name`)
    .post(createMinion)

minionRouter.route(`${MINION_PATH}:id`)
    .put(updateMinion)
    .get(getMinion)

minionRouter.route(`${MINION_PATH}:id/skills`)
    .put(updateMinionSkill)

minionRouter.route(`${MINION_PATH}:id/talents`)
    .put(updateMinion)

minionRouter.route(`${MINION_PATH}:id/ability`)
    .put(updateMinion)

minionRouter.route(`${MINION_PATH}:id/weapons`)
    .put(updateMinion)

minionRouter.route(`${MINION_PATH}:id/armor`)
    .put(updateMinion)

minionRouter.route(`${MINION_PATH}:id/gear`)
    .put(updateMinion)