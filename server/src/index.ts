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
  connectionString: "postgres://zxlcvmuw:JtPHWHscDxfxRIR9wSHhAjOcH6JoahFK@raja.db.elephantsql.com/zxlcvmuw"
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

// Listagem de um parceiro por ID
app.get('/Parceiros/:parceiro_id', async (req, res) => {
  try {
    const { parceiro_id } = req.params;

    const result = await connectionDB.query('SELECT * FROM Parceiros WHERE parceiro_id = $1', [parceiro_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Parceiro não encontrado' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Editar as informações do parceiro por ID.
app.put('/Parceiros/:parceiro_id', async (req, res) => {
  try {
    const { parceiro_id } = req.params;
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

    // Montar o objeto com os campos que foram alterados.
    const updatedFields: { [key: string]: any } = {};
    if (parceiro_nome !== undefined) updatedFields.parceiro_nome = parceiro_nome;
    if (parceiro_email !== undefined) updatedFields.parceiro_email = parceiro_email;
    if (parceiro_cnpj_cpf !== undefined) updatedFields.parceiro_cnpj_cpf = parceiro_cnpj_cpf;
    if (parceiro_telefone !== undefined) updatedFields.parceiro_telefone = parceiro_telefone;
    if (parceiro_expertises !== undefined) updatedFields.parceiro_expertises = parceiro_expertises;
    if (parceiro_logradouro !== undefined) updatedFields.parceiro_logradouro = parceiro_logradouro;
    if (parceiro_logradouro_numero !== undefined) updatedFields.parceiro_logradouro_numero = parceiro_logradouro_numero;
    if (parceiro_bairro !== undefined) updatedFields.parceiro_bairro = parceiro_bairro;
    if (parceiro_cep !== undefined) updatedFields.parceiro_cep = parceiro_cep;
    if (parceiro_cidade !== undefined) updatedFields.parceiro_cidade = parceiro_cidade;
    if (parceiro_estado !== undefined) updatedFields.parceiro_estado = parceiro_estado;
    if (parceiro_pais !== undefined) updatedFields.parceiro_pais = parceiro_pais;
    if (parceiro_senha !== undefined) {
      const hashedPassword = await bcrypt.hash(parceiro_senha, 10);
      updatedFields.parceiro_senha = hashedPassword;
    }

    // Montar a query SQL para atualizar apenas os campos alterados
    const fields = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

    // Atualizar as informações do parceiro no banco de dados
    const queryText = `UPDATE Parceiros SET ${setClause} WHERE parceiro_id = $1`;
    await connectionDB.query(queryText, [parceiro_id, ...values]);

    res.status(200).json({ message: 'Parceiro atualizado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// ADMIN

//Cadastro de outro Administrador
app.post('/CadastroADMIN', async (req, res) => {
  try {
    const {
      administrador_nome,
      administrador_email,
      administrador_senha,
      administrador_nivel_acesso,
    } = req.body;

    const hashedPassword = await bcrypt.hash(administrador_senha, 10);

    await connectionDB.query(
      'INSERT INTO Administradores(administrador_nome, administrador_email, administrador_senha, administrador_nivel_acesso) VALUES ($1, $2, $3, $4);',
      [administrador_nome, administrador_email, hashedPassword, administrador_nivel_acesso]
    );

    res.status(201).json({ message: 'Administrador criado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Listagem dos parceiros
app.get('/Parceiros', async (req, res) => {
  try {
    const result = await DB.query('SELECT * FROM Parceiros;');

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Parceiros não encontrados' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});