import Modifier from "../../../src/models/common/Modifier";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM TalentModification WHERE talent_id = ?').bind(context.params.talent_id).all<Modifier>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Modifier
    const results = await context.env.GENESYS.prepare(`INSERT INTO TalentModification (talent_id, type, ranks) VALUES (?1, ?2, ?3) RETURNING *`).bind(context.params.talent_id, createResult.type, createResult.ranks).first<Modifier>();
    return Response.json(results);
}