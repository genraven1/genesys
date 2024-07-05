import Injury from "../../src/models/Injury";
import Modifier from "../../src/models/common/Modifier";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const injury = await context.env.GENESYS.prepare('SELECT * FROM Injury WHERE injury_id = ?')
        .bind(context.params.injury_id)
        .first<Injury>();
    const {results} = await context.env.GENESYS.prepare(`SELECT * FROM InjuryModification WHERE injury_id = ?`)
        .bind(context.params.injury_id)
        .all<Modifier>();
    injury.modifiers = results;
    return Response.json(injury);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Injury
    const result = await context.env.GENESYS.prepare('UPDATE Injury SET description = ?2, severity = ?3, min = ?4, max = ?5 WHERE injury_id = ?1 RETURNING *')
        .bind(context.params.injury_id, updatedResult.description, updatedResult.severity, updatedResult.min, updatedResult.max)
        .first<Injury>();
    return Response.json(result)
}