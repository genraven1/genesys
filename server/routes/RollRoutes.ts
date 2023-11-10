import Router from "express-promise-router";
import {ROLL_PATH} from "../utils/Path.ts";
import {resolveRoll} from "../controller/RollController.ts";

export const rollRouter = Router();

rollRouter.route(ROLL_PATH)
.post(resolveRoll)