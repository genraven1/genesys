import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {skillRouter} from './routes/SkillRoutes.ts';
import {talentRouter} from './routes/TalentRoutes.ts';
import {settingRouter} from "./routes/SettingRoutes.ts";
import {currentSettingRouter} from "./routes/CurrentSettingRoutes.ts";
import {minionRouter} from "./routes/MinionRoutes.ts";
import {npaRouter} from "./routes/NonPlayerActorRoutes.ts";
import {qualityRouter} from "./routes/QualityRoutes.ts";
import {weaponRouter} from "./routes/WeaponRoutes.ts";
import {armorRouter} from "./routes/ArmorRoutes.ts";
import {rivalRouter} from "./routes/RivalRoutes.ts";
import { rollRouter } from "./routes/RollRoutes.ts";


dotenv.config();
const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use('', currentSettingRouter);
app.use('', rollRouter);
app.use('', settingRouter);
app.use('', skillRouter);
app.use('', talentRouter);
app.use('', qualityRouter);
app.use('', weaponRouter);
app.use('', armorRouter);
app.use('', npaRouter);
app.use('', minionRouter);
app.use('', rivalRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});