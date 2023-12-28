import Router from 'express-promise-router';
import {WEAPON_PATH} from "../utils/Path.ts";
import {
    addWeaponQuality,
    createWeapon,
    getAllWeapons,
    getWeapon,
    updateWeapon
} from "../controller/WeaponController.ts";

export const weaponRouter = Router();

weaponRouter.route(WEAPON_PATH)
    .get(getAllWeapons)

weaponRouter.route(`${WEAPON_PATH}:name`)
    .post(createWeapon)

weaponRouter.route(`${WEAPON_PATH}:id`)
    .put(updateWeapon)
    .get(getWeapon)

weaponRouter.route(`${WEAPON_PATH}:id/quality`)
    .put(addWeaponQuality)