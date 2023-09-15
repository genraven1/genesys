import express from "express";

const router = express.router()

router.route(SKILL_PATH)
.get(getAllSkills)

router.route(SKILL_PATH + '/:name')
.post(createSkill)

router.route(SKILL_PATH + '/:id')
.put(updateSkill)
.get(getSkill)