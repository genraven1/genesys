import {
    createSetting,
    getAllSettings,
    getSetting,
    updateSetting
} from "../controller/SettingController.ts";
import Router from "express-promise-router";

export const settingRouter = Router();

settingRouter.route('')
.get(getAllSettings)

settingRouter.route(':name')
.post(createSetting)

settingRouter.route(':id')
.put(updateSetting)
.get(getSetting)