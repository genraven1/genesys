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
    const createResult = await context.request.json() as Campaign;
    const party = await context.env.GENESYS.prepare('INSERT INTO Party (party_id) VALUES (null) RETURNING *')
        .first<Party>();
    console.log(party)
    const result = await context.env.GENESYS.prepare('INSERT INTO Campaign (campaign_id, name, party_id) VALUES (null, ?1, ?2) RETURNING *')
        .bind(createResult.name, party.party_id)
        .first<Campaign>();
    return Response.json(result);
}