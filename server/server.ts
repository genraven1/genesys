import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {skillRouter} from './routes/SkillRoutes.ts';
import {talentRouter} from './routes/TalentRoutes.ts';
import {settingRouter} from "./routes/SettingRoutes.ts";
import {currentSettingRouter} from "./routes/CurrentSettingRoutes.ts";
import {minionRouter} from "./routes/MinionRoutes.ts";
import {npaRouter} from "./routes/NonPlayerActorRoutes.ts";

dotenv.config();
const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('', currentSettingRouter);
app.use('', settingRouter);
app.use('', skillRouter);
app.use('', talentRouter);
app.use('', npaRouter);
app.use('', minionRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});