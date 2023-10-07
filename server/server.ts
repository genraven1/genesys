import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {SETTING_PATH, SKILL_PATH, TALENT_PATH} from "./utils/Path.ts";
import {skillRouter} from './routes/SkillRoutes.ts';
import {talentRouter} from './routes/TalentRoutes.ts';
import {settingRouter} from "./routes/SettingRoutes.ts";
import {currentSettingRouter} from "./routes/CurrentSettingRoutes.ts";

dotenv.config();
const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('', currentSettingRouter);
app.use(SETTING_PATH, settingRouter);
app.use(SKILL_PATH, skillRouter);
app.use(TALENT_PATH, talentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});