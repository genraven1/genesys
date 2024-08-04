import Injury from "../../src/models/Injury";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const query = `SELECT i.*,
                          JSON_ARRAY(
                                  JSON_OBJECT('type', im.type, 'ranks', im.ranks)
                          ) AS "modifiers"
                   FROM Injury AS i
                            LEFT JOIN InjuryModification im ON i.injury_id = im.injury_id
                   WHERE injury_id = ?`
    const injury = await context.env.GENESYS.prepare(query).bind(context.params.injury_id).first<Injury>();
    if (typeof injury.modifiers === 'string') injury.modifiers = JSON.parse(injury.modifiers);
    return Response.json(injury);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Injury
    const result = await context.env.GENESYS.prepare('UPDATE Injury SET description = ?2, severity = ?3, min = ?4, max = ?5 WHERE injury_id = ?1 RETURNING *')
        .bind(context.params.injury_id, updatedResult.description, updatedResult.severity, updatedResult.min, updatedResult.max)
        .first<Injury>();
    return Response.json(result)
}