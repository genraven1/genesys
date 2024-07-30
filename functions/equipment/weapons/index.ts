import {Weapon} from "../../../src/models/equipment/Weapon";


interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    let query = `SELECT w.*,
                        JSON_OBJECT(
                                'skill_id', s.skill_id,
                                'characteristic', s.characteristic,
                                'type', s.type,
                                'name', s.name
                        ) AS "skill",
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
                        ) AS "qualities"
                 FROM Weapon AS w
                          INNER JOIN WeaponModification wm ON w.weapon_id = wm.weapon_id
                          INNER JOIN WeaponQuality AS wq ON w.weapon_id = wq.weapon_id
                          INNER JOIN QualityModification qm ON wq.quality_id = qm.quality_id
                          INNER JOIN Quality AS q ON wq.quality_id = q.quality_id
                          INNER JOIN Skill AS s ON w.skill_id = s.skill_id;`
    const {results} = await context.env.GENESYS.prepare(query)
        .all<Weapon>();
    for (let weapon of results) {
        if (typeof weapon.modifiers === 'string') JSON.parse(weapon.modifiers)
        if (typeof weapon.qualities === 'string') JSON.parse(weapon.qualities)
        if (typeof weapon.skill ==='string') weapon.skill = JSON.parse(weapon.skill)
    }
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Weapon
    const result = await context.env.GENESYS.prepare('INSERT INTO Weapon (weapon_id, name) VALUES (null, ?) RETURNING *')
        .bind(createResult.name)
        .first<Weapon>();
    return Response.json(result)
}