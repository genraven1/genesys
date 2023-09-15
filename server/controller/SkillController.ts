

export const getAllSkills = (req, res) => {
    let collection = await db.collection(SKILL_COLLECTION);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
}

export const createSkill = (req, res) => {
    let newDocument = {
        name: req.params.name
    };
    let collection = await db.collection(SKILL_COLLECTION);
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
}

export const getSkill = (req, res) => {
    let collection = await db.collection(SKILL_COLLECTION);
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not Found").status(404);
    else res.send(result).status(200);
}

export const updateSkill = (res, req) => {

}