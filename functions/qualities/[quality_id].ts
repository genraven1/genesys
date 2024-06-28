import Modifier from "../../src/models/common/Modifier";
import Quality from "../../src/models/Quality";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const quality = await context.env.GENESYS.prepare('SELECT * FROM Quality WHERE quality_id = ?').bind(context.params.quality_id).first<Quality>();
    const {results} = await context.env.GENESYS.prepare(`SELECT * FROM QualityModification WHERE quality_id = ?`).bind(context.params.quality_id).all<Modifier>();
    quality.modifiers = results;
    return Response.json(quality);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Quality
    const result = await context.env.GENESYS.prepare('UPDATE Quality SET description = ?2 WHERE quality_id = ?1 RETURNING *').bind(context.params.quality_id, updatedResult.description).first<Quality>();
    return Response.json(result)
}