import {Armor} from "../../../src/models/equipment/Armor";
import Modifier from "../../../src/models/common/Modifier";
import Quality, {EquipmentQuality} from "../../../src/models/Quality";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const armor = await context.env.GENESYS.prepare('SELECT * FROM Armor WHERE armor_id = ?').bind(context.params.armor_id).first<Armor>();
    // const {results} = await context.env.GENESYS.prepare(`SELECT * FROM ArmorModification WHERE armor_id = ?`).bind(context.params.armor_id).all<Modifier>();
    // armor.modifiers = results
    const {results} = await context.env.GENESYS.prepare(`SELECT * FROM ArmorQuality WHERE armor_id = ?`).bind(context.params.armor_id).all<EquipmentQuality>();
    armor.qualities = results
    return Response.json(armor);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Armor;
    const result = await context.env.GENESYS.prepare('UPDATE Armor SET description = ?2 WHERE injury_id = ?1 RETURNING *').bind(context.params.injury_id, updatedResult.description).first<Armor>();
    return Response.json(result);
}