import { Pool } from "pg";

const DB = new Pool({
    connectionString: "postgres://dytopzjm:G426WLiNfydDu6kKvM_m6Q5YcVRcpqz6@isabelle.db.elephantsql.com/dytopzjm"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: '',       // Sua database
    // password: '',
    // port: 5432             //port PostgreSQL padrão = 5432
});

export default DB;