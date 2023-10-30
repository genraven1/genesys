import Router from "express-promise-router";
import {RIVAL_PATH} from "../utils/Path.ts";
import {
    addRivalArmor,
    addRivalWeapon,
    createRival,
    getAllRivals,
    getRival,
    updateRival,
    updateRivalSkill
} from "../controller/RivalController.ts";

export const rivalRouter = Router();

rivalRouter.route(RIVAL_PATH)
    .get(getAllRivals)

rivalRouter.route(`${RIVAL_PATH}:name`)
    .post(createRival)

rivalRouter.route(`${RIVAL_PATH}:id`)
    .put(updateRival)
    .get(getRival)

rivalRouter.route(`${RIVAL_PATH}:id/skills`)
    .put(updateRivalSkill)

rivalRouter.route(`${RIVAL_PATH}:id/talents`)
    .put()

rivalRouter.route(`${RIVAL_PATH}:id/ability`)
    .put()

rivalRouter.route(`${RIVAL_PATH}:id/weapons`)
    .put(addRivalWeapon)

rivalRouter.route(`${RIVAL_PATH}:id/armors`)
    .put(addRivalArmor)

rivalRouter.route(`${RIVAL_PATH}:id/gears`)
    .put()