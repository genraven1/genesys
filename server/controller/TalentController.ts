import {pool} from '../config/Database.ts';

export const getAllTalents = async (req, res) => {
    const query = "SELECT * from talents;";
    const results = await pool.query(query);
    res.send(results.rows);
};

export const getTalent = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from talents WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    res.send(results.row);
};

export const createTalent = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM talents;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO talents (name, id) VALUES ($1, $2) RETURNING *;";
    const values = [name, Number(count.rows[0]['count']) + 1];
    const results = await pool.query(insertQuery, values);
    res.send(results.rows[0]);
};

export const updateTalent = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = "UPDATE talents SET name = $1 WHERE id = $2 RETURNING *;";
    const values = [name, id];
    const results = await pool.query(query, values);
    res.send(results.row[0]);
};