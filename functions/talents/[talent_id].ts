import Modifier from "../../src/models/common/Modifier";
import Talent from "../../src/models/Talent";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const talent = await context.env.GENESYS.prepare('SELECT * FROM Talent WHERE talent_id = ?').bind(context.params.talent_id).first<Talent>();
    const {results} = await context.env.GENESYS.prepare(`SELECT * FROM TalentModification WHERE talent_id = ?`).bind(context.params.talent_id).all<Modifier>();
    talent.modifiers = results;
    return Response.json(talent);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Talent
    const result = await context.env.GENESYS.prepare('UPDATE Talent SET description = ?2 summary = ?3 activation = ?4 tier = ?5 ranked = ?6 WHERE talent_id = ?1 RETURNING *').bind(context.params.talent_id, updatedResult.description, updatedResult.summary, updatedResult.activation, updatedResult.tier, updatedResult.ranked).first<Talent>();
    return Response.json(result)
}