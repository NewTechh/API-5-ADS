import { Pool } from "pg";

const DB = new Pool({

     user: 'postgres',       //user PostgreSQL padrão = postgres
     host: 'localhost',
     database: 'API',       // Sua database
     password: 'isa123',
     port: 5432             //port PostgreSQL padrão = 5432
});

export default DB;