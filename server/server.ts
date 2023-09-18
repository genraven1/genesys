import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {SETTING_PATH} from "./utils/Path.ts";
import {settingRouter} from "./routes/SettingRoutes.ts";

dotenv.config();
const PORT = 5050;
const app = express()

app.use(cors());
app.use(express.json());

app.use(SETTING_PATH, settingRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});