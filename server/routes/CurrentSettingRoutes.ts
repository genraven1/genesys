import {getCurrentSetting, setCurrentSetting} from "../controller/CurrentSettingController.ts";
import Router from "express-promise-router";

export const currentSettingRouter = Router();

currentSettingRouter.route("")
    .get(getCurrentSetting)

currentSettingRouter.route(":id")
    .post(setCurrentSetting)