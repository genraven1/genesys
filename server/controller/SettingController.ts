import { ObjectId } from 'mongodb';
import db from '../config/Database'
import {SETTING_COLLECTION} from "../utils/Collections";
import Setting from "../models/Setting";

export const getAllSettings = async (req, res) => {
    let collection = await db.collection(SETTING_COLLECTION);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
};

export const getSetting = async (req, res) => {
    let collection = await db.collection(SETTING_COLLECTION);
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
};

export const getCurrentSetting = async (req, res) => {
    let collection = await db.collection(SETTING_COLLECTION);
    let query = {current: true};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
};

export const createSetting = async (req, res) => {
    let newDocument = {
        name: req.params.name,
    };
    let collection = await db.collection(SETTING_COLLECTION);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
};

export const updateSetting = async (req, res) => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };

    let collection = await db.collection(SETTING_COLLECTION);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
}

export const setCurrentSetting = async (req, res) => {
    let collection = await db.collection(SETTING_COLLECTION);
    let getQuery = {_id: new ObjectId(req.params.id)};
    let currentSetting = await collection.findOne(getQuery) as Setting;
    
    for (const setting of await collection.find({}).toArray() as Setting[]) {
        const updatedSetting =  {
            $set: {
                name: setting.name,
                magic: setting.magic,
                current: false
            }
        };
        collection.updateOne({_id: new ObjectId(setting.id)}, updatedSetting);
    }
    const updatedCurrentSetting =  {
        $set: {
            name: currentSetting.name,
            magic: currentSetting.magic,
            current: false
        }
    };
    let result = await collection.updateOne({_id: new ObjectId(currentSetting.id)}, updatedCurrentSetting);
    res.send(result).status(200);
}