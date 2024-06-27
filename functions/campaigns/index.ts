import Campaign from "../../src/models/campaign/Campaign";
import Party from "../../src/models/campaign/Party";

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
    result.party = await context.env.GENESYS.prepare('INSERT INTO Party (party_id) VALUES (null) RETURNING *').first<Party>()
    return Response.json(result)
}