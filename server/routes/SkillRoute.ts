import express from "express";
import {SKILL_PATH} from '../utils/Path.ts'

export const skillRouter = express.router()

skillRouter.route(SKILL_PATH)
.get(getAllSkills)

skillRouter.route(SKILL_PATH + ':name')
.post(createSkill)

skillRouter.route(SKILL_PATH + ':id')
.put(updateSkill)
.get(getSkill)