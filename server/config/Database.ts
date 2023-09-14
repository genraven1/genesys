import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URI);

let conn;
try {
    conn = client.connect();
} catch(e) {
    console.error(e);
}

let db = conn.db("genesys");

export default db;