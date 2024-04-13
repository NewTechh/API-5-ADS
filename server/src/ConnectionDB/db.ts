import { Pool } from "pg";

const DB = new Pool({
    connectionString: "postgres://qacantwm:xEmJEBlOA2WHGWfqM68I32CUCsT2FXBf@isabelle.db.elephantsql.com/qacantwm"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: 'api',       // Sua database
    // password: '1234',
    // port: 5430             //port PostgreSQL padrão = 5432
});

export default DB;