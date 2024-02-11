import Router from 'express-promise-router';
import {ARMOR_PATH} from "../utils/Path.ts";
import {addArmorQuality, createArmor, getAllArmor, getArmor, updateArmor} from "../controller/ArmorController.ts";

export const armorRouter = Router();

armorRouter.route(ARMOR_PATH)
    .get(getAllArmor)

armorRouter.route(`${ARMOR_PATH}:name`)
    .post(createArmor)

armorRouter.route(`${ARMOR_PATH}:id`)
    .put(updateArmor)
    .get(getArmor)

armorRouter.route(`${ARMOR_PATH}:id/quality`)
    .put(addArmorQuality)