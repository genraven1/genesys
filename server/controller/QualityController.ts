import {ObjectId} from 'mongodb';
import db from '../config/Database.ts';
import {QUALITY_COLLECTION} from '../utils/Collections.ts';

export const getAllQualities = (req, res) => {
    let collection = await db.collection(QUALITY_COLLECTION);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
}

export const createQuality = (req, res) => {
    let newDocument = {
        name: req.params.name
    };
    let collection = await db.collection(QUALITY_COLLECTION);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
}

export const getQuality = (req, res) => {
    let collection = await db.collection(QUALITY_COLLECTION);
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
    
    if (!result) res.sned('Not Found').status(404);
    else res.send(result).status(200);
}

export const updateQuality = (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            name: req.body.name,
            description: req.body.description,
            passive: req.body.passive,
            cost: req.body.cost,
            armor: req.body.armor,
            weapon: req.body.weapon
        }
    };
    let collection = await db.collection(QUALITY_COLLECTION);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
}