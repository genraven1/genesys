import {pool} from "../config/Database.ts";

export const getAllSettings = async (req, res) => {
    const query = "SELECT * FROM setting;";
    const results = await pool.query(query);
    res.send(results.rows);
};

export const getSetting = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM setting WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    res.send(results.rows);
};

export const createSetting = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM setting;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO setting (name, id) VALUES ($1, $2) RETURNING *;";
    const values = [name, Number(count.rows[0]['count']) + 1];
    const results = await pool.query(insertQuery, values);
    res.send(results.rows[0]);
};

export const updateSetting = async (req, res) => {
    const { id } = req.params;
    const { name, magic } = req.body;
    const query = "UPDATE setting SET name = $1, magic = $3 WHERE id = $2 RETURNING *;";
    const values = [name, id, magic];
    const result = await pool.query(query, values);
    res.send(result.rows[0]);
};