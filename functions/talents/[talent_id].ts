import Talent from "../../src/models/Talent";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const query= `SELECT t.*,
                         JSON_ARRAY(
                                 JSON_OBJECT('type', tm.type, 'ranks', tm.ranks)
                         ) AS "modifiers"
                  FROM Talent AS t
                           LEFT JOIN TalentModification tm ON t.talent_id = tm.talent_id
                  WHERE t.talent_id = ?;`
    const talent = await context.env.GENESYS.prepare(query).bind(context.params.talent_id).first<Talent>();
    if (typeof talent.modifiers === 'string') talent.modifiers = JSON.parse(talent.modifiers);
    return Response.json(talent);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Talent
    const result = await context.env.GENESYS.prepare(`UPDATE Talent SET description = ?2, summary = ?3, activation = ?4, tier = ?5, ranked = ?6 WHERE talent_id = ?1 RETURNING *`)
        .bind(context.params.talent_id, updatedResult.description, updatedResult.summary, updatedResult.activation, updatedResult.tier, updatedResult.ranked)
        .first<Talent>();
    return Response.json(result)
}