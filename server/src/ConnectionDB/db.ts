import { Pool } from "pg";

const DB = new Pool({
    connectionString: "postgres://kaoewtuc:YceKhbsmqmOUcCYZD3ZLgsZkQs3YPPKc@isabelle.db.elephantsql.com/kaoewtuc"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: 'api',       // Sua database
    // password: '1234',
    // port: 5430             //port PostgreSQL padrão = 5432
});

export default DB;