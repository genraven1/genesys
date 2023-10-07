import Setting from "../models/Setting.ts";
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

};

export const updateSetting = async (req, res) => {

};