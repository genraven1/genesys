import {Armor} from "../../../src/models/equipment/Armor";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const query = `SELECT a.*,
                          JSON_ARRAY(
                                  JSON_OBJECT('type', am.type, 'ranks', am.ranks)
                          ) AS "modifiers",
                          JSON_ARRAY(
                                  JSON_OBJECT(
                                          'quality_id', q.quality_id,
                                          'name', q.name,
                                          'description', q.description,
                                          'passive', q.passive,
                                          'cost', q.cost,
                                          'armor', q.armor,
                                          'weapon', q.weapon,
                                          'ranks', aq.ranks,
                                          'modifiers', JSON_ARRAY(
                                                  JSON_OBJECT('type', qm.type, 'ranks', qm.ranks)
                                                       )
                                  )
                          ) AS "qualities"
                   FROM Armor AS a
                            LEFT JOIN ArmorModification am ON a.armor_id = am.armor_id
                            LEFT JOIN ArmorQuality AS aq ON a.armor_id = aq.armor_id
                            LEFT JOIN QualityModification qm ON aq.quality_id = qm.quality_id
                            LEFT JOIN Quality AS q ON aq.quality_id = q.quality_id
                   WHERE a.armor_id = ?;`
    const armor = await context.env.GENESYS.prepare(query)
        .bind(context.params.armor_id)
        .first<Armor>();
    if (typeof armor.modifiers === 'string') armor.modifiers = []
    if (typeof armor.qualities === 'string') armor.qualities = []
    return Response.json(armor);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Armor;
    const result = await context.env.GENESYS.prepare('UPDATE Armor SET description = ?2, soak = ?3, defense = ?4, encumbrance = ?5, price = ?6, rarity = ?7, restricted = ?8 WHERE armor_id = ?1 RETURNING *')
        .bind(context.params.armor_id, updatedResult.description, updatedResult.soak, updatedResult.defense, updatedResult.encumbrance, updatedResult.price, updatedResult.rarity, updatedResult.restricted)
        .first<Armor>();
    return Response.json(result);
}