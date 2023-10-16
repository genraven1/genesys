import Router from "express-promise-router";
import {NPC_PATH} from "../utils/Path.ts";
import {getAllNonPlayerActors} from "../controller/NonPlayerActorController.ts";

export const npaRouter = Router();

npaRouter.route(NPC_PATH)
    .get(getAllNonPlayerActors)