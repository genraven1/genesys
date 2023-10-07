import {pool} from "../config/Database.ts";

export const getAllSettings = async (req, res) => {
    const results = await pool.query("SELECT * FROM setting;");
    res.send(results.rows);
};

export const getSetting = async (req, res) => {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM setting WHERE id = $1;", [id]);
    res.send(results.rows);
};

export const createSetting = async (req, res) => {
    const { name } = req.params;
    const count = await pool.query("SELECT COUNT(*) FROM setting;");
    const results = await pool.query("INSERT INTO setting (name, id) VALUES ($1, $2) RETURNING *;", [name, Number(count.rows[0]['count']) + 1]);
    res.send(results.rows[0]);
};

export const updateSetting = async (req, res) => {
    const { id } = req.params;
    const { name, magic } = req.body;
    const result = await pool.query("UPDATE setting SET name = $1, magic = $3 WHERE id = $2 RETURNING *;", [name, id, magic]);
    res.send(result.rows[0]);
};