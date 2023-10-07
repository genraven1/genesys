import {pool} from "../config/Database.ts";

export const getCurrentSetting = async (req, res) => {
    const result = await pool.query("SELECT name FROM current;");
    res.send(result.rows[0]);
};

export const setCurrentSetting = async (req, res) => {
    const { id } = req.params;
    const results = await pool.query("SELECT name FROM setting WHERE id = $1;", [id]);
    const update = await pool.query("UPDATE setting SET name = $1;", [results.rows[0]])
    res.send(update.rows);
};