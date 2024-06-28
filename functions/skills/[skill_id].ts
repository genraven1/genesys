import Skill from "../../src/models/actor/Skill";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const skill = await context.env.GENESYS.prepare('SELECT * FROM Skill WHERE skill_id = ?').bind(context.params.skill_id).first<Skill>();
    return Response.json(skill);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Skill
    const result = await context.env.GENESYS.prepare('UPDATE Skill SET type = ?2, characteristic = ?3 WHERE skill_id = ?1 RETURNING *').bind(context.params.skill_id, updatedResult.type, updatedResult.characteristic).first<Skill>();
    return Response.json(result)
}