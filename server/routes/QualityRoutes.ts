import express from 'express';
import {QUALITY_PATH} from '../utils/Path.ts';
import {createQuality, getAllQualitities, getQuality, updateQuality} from '../controller/QualityCollection.ts';

export const qualityRouter = express.Router();

qualityRouter.route(QUALITY_PATH)
.get(getAllQualities)

qualityRouter.route(QUALITY_PATH + ':name')
.post(createQuality)

qualityRouter.route(QUALITY_PATH + ':id')
.put(updateQuality)
.get(getQuality)