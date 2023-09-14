import { ObjectId } from 'mongodb';
import db from '../config/Database'
import { TALENT_COLLECTION } from '../utils/Collections';

export const getAllTalents = async (req, res) => {
    let collection = await db.collection(TALENT_COLLECTION);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
};

export const getTalent = async (req, res) => {
    let collection = await db.collection(TALENT_COLLECTION);
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
};

export const createTalent = async (req, res) => {
    let newDocument = {
        name: req.params.name,
    };
    let collection = await db.collection(TALENT_COLLECTION);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
};

export const updateTalent = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };

    let collection = await db.collection(TALENT_COLLECTION);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
}