import Campaign from "../../src/models/campaign/Campaign";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const campaign = await context.env.GENESYS.prepare('SELECT * FROM Campaign WHERE campaign_id = ?').bind(context.params.campaign_id).first<Campaign>();
    return Response.json(campaign);
}