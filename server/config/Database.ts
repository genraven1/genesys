import { MongoClient } from "mongodb";



let conn;
try {
    const client = new MongoClient("mongodb+srv://genesys:b00gercaT@atlascluster.6frdbwn.mongodb.net/?retryWrites=true&w=majority");
    conn = await client.connect();
} catch(e) {
    console.error(e);
}

let db = conn.db("genesys");

export default db;