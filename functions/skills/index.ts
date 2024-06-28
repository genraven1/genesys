import Skill from "../../src/models/actor/Skill";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Skill').all<Skill>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Skill
    const result = await context.env.GENESYS.prepare('INSERT INTO Skill (skill_id, name) VALUES (null, ?) RETURNING *').bind(createResult.name).first<Skill>();
    return Response.json(result)
}