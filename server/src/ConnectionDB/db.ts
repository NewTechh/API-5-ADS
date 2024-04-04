import { Pool } from "pg";

const DB = new Pool({
    connectionString: "postgres://zxlcvmuw:JtPHWHscDxfxRIR9wSHhAjOcH6JoahFK@raja.db.elephantsql.com/zxlcvmuw"
    // user: 'postgres',       //user PostgreSQL padrão = postgres
    // host: 'localhost',
    // database: '',       // Sua database
    // password: '',
    // port: 5432             //port PostgreSQL padrão = 5432
});

export default DB;