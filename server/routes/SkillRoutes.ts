import express from "express";
import {SKILL_PATH} from '../utils/Path.ts'
import {createSkill, getAllSkills, getSkill, updateSkill } from "../controller/SkillController.ts";

export const skillRouter = express.Router()

skillRouter.route(SKILL_PATH)
.get(getAllSkills)

skillRouter.route(SKILL_PATH + ':name')
.post(createSkill)

skillRouter.route(SKILL_PATH + ':id')
.put(updateSkill)
.get(getSkill)