import {getCurrentSetting, setCurrentSetting} from "../controller/CurrentSettingController.ts";
import Router from "express-promise-router";
import {CURRENT_PATH} from "../utils/Path.ts";

export const currentSettingRouter = Router();

currentSettingRouter.route(CURRENT_PATH)
    .get(getCurrentSetting)

currentSettingRouter.route(`${CURRENT_PATH}:id`)
    .post(setCurrentSetting)