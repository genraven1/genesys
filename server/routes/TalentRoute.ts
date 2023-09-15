import express from "express";
import {createTalent, getAllTalents, getTalent, updateTalent} from '../controller/TalentController'
import {TALENT_PATH} from "../utils/Path";

const router = express.Router()

router.route(TALENT_PATH)
.get(getAllTalents)

router.route(TALENT_PATH + '/:name')
.post(createTalent)

router.route(TALENT_PATH + '/:id')
.put(updateTalent)
.get(getTalent)