import Router from 'express-promise-router';
import {WEAPON_PATH} from "../utils/Path.ts";

export const weaponRouter = Router();

weaponRouter.route(WEAPON_PATH)
    .get()

weaponRouter.route(`${WEAPON_PATH}:name`)
    .post()

weaponRouter.route(`${WEAPON_PATH}:id`)
    .put()
    .get()