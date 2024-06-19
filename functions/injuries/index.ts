import Injury from "../../src/models/Injury";

interface Env {
    GENESYS: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    // Create a prepared statement with our query
    const {results} = await context.env.GENESYS.prepare('SELECT * FROM Injury').all<Injury>();
    return Response.json(results);
}