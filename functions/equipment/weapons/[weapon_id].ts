import {Weapon} from "../../../src/models/equipment/Weapon";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const query = `SELECT w.*,
                          JSON_ARRAY(
                                  JSON_OBJECT('type', wm.type, 'ranks', wm.ranks)
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
                                          'ranks', wq.ranks,
                                          'modifiers', JSON_ARRAY(
                                                  JSON_OBJECT('type', qm.type, 'ranks', qm.ranks)
                                                       )
                                  )
                          ) AS "qualities",
                          JSON_OBJECT(
                                  'skill_id', s.skill_id,
                                  'characteristic', s.characteristic,
                                  'type', s.type,
                                  'name', s.name
                          ) AS "skill"
                   FROM Weapon AS w
                            LEFT JOIN WeaponModification wm ON w.weapon_id = wm.weapon_id
                            LEFT JOIN WeaponQuality AS wq ON w.weapon_id = wq.weapon_id
                            LEFT JOIN QualityModification qm ON wq.quality_id = qm.quality_id
                            LEFT JOIN Quality AS q ON wq.quality_id = q.quality_id
                            LEFT JOIN Skill s ON w.skill_id = s.skill_id
                   WHERE w.weapon_id = ?;`
    const weapon = await context.env.GENESYS.prepare(query)
        .bind(context.params.weapon_id)
        .first<Weapon>();
    if (typeof weapon.modifiers === 'string') weapon.modifiers = []
    if (typeof weapon.qualities === 'string') weapon.qualities = []
    if (typeof weapon.skill ==='string') weapon.skill = JSON.parse(weapon.skill)
    return Response.json(weapon);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Weapon;
    const result = await context.env.GENESYS.prepare('UPDATE Weapon SET description = ?2, encumbrance = ?3, price = ?4, rarity = ?5, restricted = ?6, damage = ?7, critical = ?8, range = ?9, brawn= ?10, hands = ?11, skill_id = ?12 WHERE weapon_id = ?1 RETURNING *')
        .bind(context.params.weapon_id, updatedResult.description, updatedResult.encumbrance, updatedResult.price, updatedResult.rarity, updatedResult.restricted, updatedResult.damage, updatedResult.critical, updatedResult.range, updatedResult.brawn, updatedResult.hands, updatedResult.skill.skill_id)
        .first<Weapon>();
    return Response.json(result);
}