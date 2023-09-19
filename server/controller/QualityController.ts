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