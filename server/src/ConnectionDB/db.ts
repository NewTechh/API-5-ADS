import { Pool } from "pg";

const DB = new Pool({
    connectionString: "postgres://qacantwm:xEmJEBlOA2WHGWfqM68I32CUCsT2FXBf@isabelle.db.elephantsql.com/qacantwm"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: '',       // Sua database
    // password: '',
    // port: 5432             //port PostgreSQL padrão = 5432
});

export default DB;