import {Weapon} from "../../../src/models/equipment/Weapon";


interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Weapon')
        .all<Weapon>();
    return Response.json(results);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const createResult = await context.request.json() as Weapon
    const result = await context.env.GENESYS.prepare('INSERT INTO Weapon (weapon_id, name) VALUES (null, ?) RETURNING *')
        .bind(createResult.name)
        .first<Weapon>();
    return Response.json(result)
}