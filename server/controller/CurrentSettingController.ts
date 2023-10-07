import {pool} from "../config/Database.ts";

export const getCurrentSetting = async (req, res) => {
    const result = await pool.query("SELECT name FROM current");
    res.send(result.rows[0]);
};

export const setCurrentSetting = async (req, res) => {

};