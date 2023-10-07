import {DATABASE, HOST, PASS, USER} from "../utils/Constants.ts";

import pg from "pg";

export const pool = new pg.Pool({
    user: USER,
    database: DATABASE,
    password: PASS,
    port: 5432,
    host: HOST,
});