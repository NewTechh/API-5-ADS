import { Pool } from "pg";

const DB = new Pool({
    connectionString: "postgres://wntuzypg:lLqghRcqw5BuWa6g0ff2UKfH472WJQIG@batyr.db.elephantsql.com/wntuzypg"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: '',       // Sua database
    // password: '',
    // port: 5432             //port PostgreSQL padrão = 5432
});

export default DB;