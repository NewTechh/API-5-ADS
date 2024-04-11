import { Pool } from "pg";

const DB = new Pool({
    connectionString: "postgres://kwimhxcj:RyNuAKu7DY4p_ksUKDL92NPXclELJpMa@isilo.db.elephantsql.com/kwimhxcj"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: '',       // Sua database
    // password: '',
    // port: 5432             //port PostgreSQL padrão = 5432
});

export default DB;