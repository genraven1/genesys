import {ObjectId} from 'mongodb';
import db from '../config/Database.ts';
import {SKILL_COLLECTION} from '../utils/Collections.ts';

export const getAllSkills = async (req, res) => {
    let collection = await db.collection(SKILL_COLLECTION);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
}

export const createSkill = async (req, res) => {
    let newDocument = {
        name: req.params.name
    };
    let collection = await db.collection(SKILL_COLLECTION);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
}

export const getSkill = async (req, res) => {
    let collection = await db.collection(SKILL_COLLECTION);
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
}

export const updateSkill = async (res, req) => {
    const query = { _id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            name: req.body.name,
            characteristic: req.body.characteristic,
            type: req.body.type,
            settings: req.body.settings
        }
    };
    let collection = await db.collection(SKILL_COLLECTION);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
}