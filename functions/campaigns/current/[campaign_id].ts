import Campaign from "../../../src/models/campaign/Campaign";

interface Env {
    GENESYS: D1Database;
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    let query = `UPDATE Campaign
                 SET current = CASE
                                   WHEN campaign_id = ? THEN 1
                                   ELSE 0
                     END
                     RETURNING *;`
    const result = await context.env.GENESYS.prepare(query).bind(context.params.campaign_id).first<Campaign>();
    return Response.json(result);
}