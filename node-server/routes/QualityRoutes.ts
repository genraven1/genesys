import Router from 'express-promise-router';
import {createQuality, getAllQualities, getQuality, updateQuality} from "../controller/QualityController.ts";
import {QUALITY_PATH} from "../utils/Path.ts";

export const qualityRouter = Router();

qualityRouter.route(QUALITY_PATH)
.get(getAllQualities)

qualityRouter.route(`${QUALITY_PATH}:name`)
.post(createQuality)

qualityRouter.route(`${QUALITY_PATH}:id`)
.put(updateQuality)
.get(getQuality)