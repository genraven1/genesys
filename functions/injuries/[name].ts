import Injury from "../../src/models/Injury";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const result = await context.env.GENESYS.prepare('SELECT * FROM Injury WHERE injury_name = ?').bind(context.params.injury_name).first<Injury>();
    return Response.json(result);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const result = await context.env.GENESYS.prepare('INSERT INTO Injury (name) VALUES (?)').bind(context.params.name).first<Injury>();
    return Response.json(result)
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const result = await context.env.GENESYS.prepare('UPDATE Injury SET description = ?2, severity = ?3, min = ?4, max = ?5 WHERE injury_name = ?1').bind(context.params.name).first<Injury>();
    return Response.json(result)
}