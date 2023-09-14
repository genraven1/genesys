import express from "express";
import {SETTING_PATH} from "../utils/Path";
import {createSetting, getAllSettings, getCurrentSetting, getSetting, setCurrentSetting, updateSetting} from "../controller/SettingController";

const router = express.Router()

router.route(SETTING_PATH)
.get(getAllSettings)
.post(createSetting)

router.route(SETTING_PATH + '/:id')
.put(updateSetting)
.get(getSetting)

router.route(SETTING_PATH + '/current')
.get(getCurrentSetting)

router.route(SETTING_PATH + '/current/:id')
.post(setCurrentSetting)