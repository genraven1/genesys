import Modifier from "../../../src/models/common/Modifier";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM InjuryModification WHERE injury_id = ?').bind(context.params.injury_id).all<Modifier>();
    return Response.json(results);
}