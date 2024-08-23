import Campaign from "../../../src/models/campaign/Campaign";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const result = await context.env.GENESYS.prepare('SELECT * FROM Campaign WHERE current = 1').first<Campaign>();
    return Response.json(result);
}