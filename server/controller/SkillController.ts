import {pool} from '../config/Database.ts';

export const getAllSkills = async (req, res) => {
    const query = "SELECT * from skills;";
    const results = await pool.query(query);
    res.send(results.rows);
}

export const createSkill = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM skills;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO skills (name, id) VALUES ($1, $2) RETURNING *;";
    const values = [name, Number(count.rows[0]['count']) + 1];
    const results = await pool.query(insertQuery, values);
    res.send(results.rows[0]);
}

export const getSkill = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM skills WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    res.send(results.rows);
}

export const updateSkill = async (res, req) => {
    const { id } = req.params;
    const { name, characteristic, type } = req.body;
    const query = "UPDATE skill SET name = $1, characteristic = $3, type = $4 WHERE id = $2 RETURNING *;";
    const values = [name, id, characteristic, type];
    const results = await pool.query(query, values);
    res.send(results.rows[0]);
}