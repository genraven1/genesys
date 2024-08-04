import {EquipmentQuality} from "../../../../src/models/Quality";

interface Env {
    GENESYS: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as EquipmentQuality
    const results = await context.env.GENESYS.prepare(`INSERT INTO WeaponQuality (weapon_id, quality_id, ranks) VALUES (?1, ?2, ?3) RETURNING *`)
        .bind(context.params.weapon_id, createResult.quality_id, createResult.ranks)
        .first<EquipmentQuality>();
    return Response.json(results);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updateResult = await context.request.json() as EquipmentQuality
    const results = await context.env.GENESYS.prepare(`UPDATE WeaponQuality SET ranks = ?3 WHERE weapon_id = ?1 AND quality_id = ?2) RETURNING *`)
        .bind(context.params.weapon_id, updateResult.quality_id, updateResult.ranks)
        .first<EquipmentQuality>();
    return Response.json(results);
}