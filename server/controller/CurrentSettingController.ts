import {pool} from "../config/Database.ts";

export const getCurrentSetting = async (req, res) => {
    const result = await pool.query("SELECT name FROM current;");
    res.send(result.rows[0]);
};

export const setCurrentSetting = async (req, res) => {
    const { id } = req.params;
    const results = await pool.query("SELECT name FROM setting WHERE id = $1;", [id]);
    await pool.query("UPDATE current SET name = $1, id = $2;", [results.rows[0]['name'], id])
    const result = await pool.query("SELECT * FROM current;");
    res.send(result.rows[0]);
};