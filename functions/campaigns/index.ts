import Campaign from "../../src/models/campaign/Campaign";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Campaign').all<Campaign>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Campaign
    const result = await context.env.GENESYS.prepare('INSERT INTO Campaign (campaign_id, name) VALUES (null, ?) RETURNING *').bind(createResult.name).first<Campaign>();
    return Response.json(result)
}