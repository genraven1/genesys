import Quality from "../../src/models/Quality";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Quality')
        .all<Quality>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Quality
    const result = await context.env.GENESYS.prepare('INSERT INTO Quality (quality_id, name) VALUES (null, ?) RETURNING *')
        .bind(createResult.name)
        .first<Quality>();
    return Response.json(result)
}