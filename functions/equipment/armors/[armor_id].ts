import {Armor} from "../../../src/models/equipment/Armor";
import Modifier from "../../../src/models/common/Modifier";
import Quality, {EquipmentQuality} from "../../../src/models/Quality";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const armor = await context.env.GENESYS.prepare('SELECT\n' +
        '    aq.armor_id AS "armor_id",\n' +
        '    a.*,\n' +
        '    JSON_ARRAY(\n' +
        '        JSON_OBJECT(\'type\', \'\', \'ranks\', NULL)\n' +
        '    ) AS "modifiers",\n' +
        '    JSON_ARRAY(\n' +
        '        JSON_OBJECT(\n' +
        '            \'quality_id\', \'\',\n' +
        '            \'description\', \'\',\n' +
        '            \'passive\', NULL,\n' +
        '            \'cost\', NULL,\n' +
        '            \'armor\', NULL,\n' +
        '            \'weapon\', NULL,\n' +
        '            \'modifiers\', JSON_ARRAY(\n' +
        '                JSON_OBJECT(\'type\', \'\', \'ranks\', NULL)\n' +
        '            )\n' +
        '        )\n' +
        '    ) AS "qualities"\n' +
        'FROM ArmorQuality AS aq\n' +
        'JOIN Quality AS q ON aq.quality_id = q.quality_id\n' +
        'JOIN Armor AS a ON aq.armor_id = a.armor_id\n' +
        'WHERE aq.armor_id = ?;').bind(context.params.armor_id).first<Armor>();
    console.log(armor)
    return Response.json(armor);
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
    const updatedResult = await context.request.json() as Armor;
    const result = await context.env.GENESYS.prepare('UPDATE Armor SET description = ?2 WHERE armor_id = ?1 RETURNING *').bind(context.params.armor_id, updatedResult.description).first<Armor>();
    return Response.json(result);
}