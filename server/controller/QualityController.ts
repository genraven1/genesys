import Quality from "../../client/src/models/Quality.ts";
import {pool} from "../config/Database.ts";

export const getAllQualities = async (req, res) => {
    const query = "SELECT * from quality;";
    const results = await pool.query(query);
    res.send(results.rows as Quality[]);
};

export const createQuality = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM quality;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO quality (name, id, armor, weapon, cost, passive) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;";
    const quality_id = Number(count.rows[0]['count']) + 1;
    const values = [name, quality_id, false, false, 0, false];
    const results = await pool.query(insertQuery, values);
    const quality = results.rows[0] as Quality;
    res.send(quality);
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