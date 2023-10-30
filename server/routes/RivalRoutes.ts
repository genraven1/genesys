import Router from "express-promise-router";
import {RIVAL_PATH} from "../utils/Path.ts";

export const rivalRouter = Router();

rivalRouter.route(RIVAL_PATH)
    .get(getAllMinions)

rivalRouter.route(`${RIVAL_PATH}:name`)
    .post(createMinion)

rivalRouter.route(`${RIVAL_PATH}:id`)
    .put(updateMinion)
    .get(getMinion)

rivalRouter.route(`${RIVAL_PATH}:id/skills`)
    .put(updateMinionSkill)

rivalRouter.route(`${RIVAL_PATH}:id/talents`)
    .put()

rivalRouter.route(`${RIVAL_PATH}:id/ability`)
    .put()

rivalRouter.route(`${RIVAL_PATH}:id/weapons`)
    .put(addMinionWeapon)

rivalRouter.route(`${RIVAL_PATH}:id/armors`)
    .put(addMinionArmor)

rivalRouter.route(`${RIVAL_PATH}:id/gears`)
    .put()