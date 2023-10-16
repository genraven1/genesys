import {pool} from "../config/Database.ts";
import {Quality} from "../models/Quality.ts";

export const getAllQualities = async (req, res) => {
    const query = "SELECT * from quality;";
    const results = await pool.query(query);
    res.send(results.rows as Quality[]);
};

export const createQuality = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM quality;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO quality (name, id) VALUES ($1, $2) RETURNING *;";
    const talent_id = Number(count.rows[0]['count']) + 1;
    const values = [name, talent_id];
    const results = await pool.query(insertQuery, values);
    const quality = results.rows[0] as Quality;
    quality.armor = false;
    quality.weapon = false;
    quality.cost = 0;
    quality.passive = false;
    res.send();
};

export const getQuality = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from quality WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    res.send(results.rows[0]);
};

export const updateQuality = async (req, res) => {
    const { id } = req.params;
    const { name, description, cost, passive, weapon, armor } = req.body as Quality;
    const query = "UPDATE quality SET name = $1, description = $3, cost = $4, passive = $5, weapon = $6, armor = $7 WHERE id = $2 RETURNING *;";
    const values = [name, id, description, cost, passive, weapon, armor];
    const results = await pool.query(query, values);
    res.send(results.rows[0]);
};