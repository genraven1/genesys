import Talent from "../../src/models/Talent";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Talent').all<Talent>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Talent;
    const result = await context.env.GENESYS.prepare('INSERT INTO Talent (talent_id, name) VALUES (null, ?) RETURNING *').bind(createResult.name).first<Talent>();
    return Response.json(result);
}