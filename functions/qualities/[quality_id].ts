import Quality from "../../src/models/Quality";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const query = `SELECT q.*,
                          JSON_ARRAY(
                                  JSON_OBJECT('type', qm.type, 'ranks', qm.ranks)
                          ) AS "modifiers"
                   FROM Quality AS q
                            LEFT JOIN QualityModification qm ON q.quality_id = qm.quality_id
                   WHERE quality_id = ?;`
    const quality = await context.env.GENESYS.prepare(query).bind(context.params.quality_id).first<Quality>();
    if (typeof quality.modifiers === 'string') quality.modifiers = JSON.parse(quality.modifiers);
    return Response.json(quality);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Quality
    const result = await context.env.GENESYS.prepare('UPDATE Quality SET description = ?2, passive = ?3, cost= ?4, weapon = ?5, armor = ?6 WHERE quality_id = ?1 RETURNING *')
        .bind(context.params.quality_id, updatedResult.description, updatedResult.passive, updatedResult.cost, updatedResult.weapon, updatedResult.armor)
        .first<Quality>();
    return Response.json(result)
}