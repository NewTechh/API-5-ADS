import express from 'express';
import cors from 'cors';
import { Pool, PoolClient } from "pg";
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser'

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Conexão com o Banco
const DB = new Pool({
  connectionString: "postgres://tyvxzqms:zQdu8MFv51gwNiw2e9AD8A4hvuw8GkRo@isabelle.db.elephantsql.com/tyvxzqms"
  // user: 'postgres',       //user PostgreSQL padrão = postgres
  // host: 'localhost',
  // database: '',       // Sua database
  // password: '',
  // port: 5432             //port PostgreSQL padrão = 5432
});

let connectionDB: PoolClient;

DB.connect().then((conn: any) => {
  connectionDB = conn;
  app.listen(port, () => {
      console.log(`Servidor inicializado em http://localhost:${port}/`);
  });
});

// Cadastro de Parceiros
app.post('/CadastroParceiros', async (req, res) => {
  try {
    const {
      parceiro_nome,
      parceiro_email,
      parceiro_cnpj_cpf,
      parceiro_telefone,
      parceiro_expertises,
      parceiro_logradouro,
      parceiro_logradouro_numero,
      parceiro_bairro,
      parceiro_cep,
      parceiro_cidade,
      parceiro_estado,
      parceiro_pais,
      parceiro_senha
    } = req.body;

    const hashedPassword = await bcrypt.hash(parceiro_senha, 10);

    await connectionDB.query(
      'INSERT INTO Parceiros (parceiro_nome, parceiro_email, parceiro_cnpj_cpf, parceiro_telefone, parceiro_expertises, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cep, parceiro_cidade, parceiro_estado, parceiro_pais, parceiro_senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
      [parceiro_nome, parceiro_email, parceiro_cnpj_cpf, parceiro_telefone, parceiro_expertises, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cep, parceiro_cidade, parceiro_estado, parceiro_pais, hashedPassword]
    );

    res.status(201).json({ message: 'Parceiro criado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});