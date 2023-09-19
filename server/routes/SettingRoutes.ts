import express from "express";
import {SETTING_PATH} from "../utils/Path.ts";
import {
    createSetting,
    getAllSettings,
    getCurrentSetting,
    getSetting,
    setCurrentSetting,
    updateSetting
} from "../controller/SettingController.ts";

export const settingRouter = express.Router();

settingRouter.route(SETTING_PATH)
.get(getAllSettings)

settingRouter.route(SETTING_PATH + ':name')
.post(createSetting)

settingRouter.route(SETTING_PATH + ':id')
.put(updateSetting)
.get(getSetting)

settingRouter.route(SETTING_PATH + 'current')
.get(getCurrentSetting)

settingRouter.route(SETTING_PATH + 'current/:id')
.post(setCurrentSetting)