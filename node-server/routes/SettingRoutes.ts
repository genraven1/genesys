import {
    createSetting,
    getAllSettings,
    getSetting,
    updateSetting
} from "../controller/SettingController.ts";
import Router from "express-promise-router";
import {SETTING_PATH} from "../utils/Path.ts";

export const settingRouter = Router();

settingRouter.route(SETTING_PATH)
.get(getAllSettings)

settingRouter.route(`${SETTING_PATH}:name`)
.post(createSetting)

settingRouter.route(`${SETTING_PATH}:id`)
.put(updateSetting)
.get(getSetting)