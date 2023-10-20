import Router from "express-promise-router";
import {MINION_PATH} from "../utils/Path.ts";
import {
    addMinionArmor,
    addMinionWeapon,
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
    .put()

minionRouter.route(`${MINION_PATH}:id/ability`)
    .put()

minionRouter.route(`${MINION_PATH}:id/weapons`)
    .put(addMinionWeapon)

minionRouter.route(`${MINION_PATH}:id/armors`)
    .put(addMinionArmor)

minionRouter.route(`${MINION_PATH}:id/gears`)
    .put()