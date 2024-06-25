import Injury from "../../src/models/Injury";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    console.log(context.params)
    const result = await context.env.GENESYS.prepare('SELECT * FROM Injury WHERE injury_id = ?').bind(context.params.id).first<Injury>();
    return Response.json(result);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Injury
    const result = await context.env.GENESYS.prepare('UPDATE Injury SET description = ?2, severity = ?3, min = ?4, max = ?5 WHERE injury_id = ?1').bind(context.params.injury_id, updatedResult.description).first<Injury>();
    return Response.json(result)
}