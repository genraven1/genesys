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
                        ) AS "skill" 
                        FROM Weapon AS w 
                            INNER JOIN Skill AS s ON w.skill_id = s.skill_id;`
    const {results} = await context.env.GENESYS.prepare(query)
        .all<Weapon>();
    for (let weapon of results) {
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