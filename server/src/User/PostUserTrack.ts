import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function CadastroDeParceirosTrilha(): express.Router {
  const router = express.Router();

  router.post('/CadastroParceirosTrilha', async (req, res) => {
    try {
      const {
        parceiro_nome,
        parceiro_email,
        parceiro_cnpj_cpf,
        parceiro_telefone,
        parceiro_logradouro,
        parceiro_logradouro_numero,
        parceiro_bairro,
        parceiro_cep,
        parceiro_cidade,
        parceiro_estado,
        parceiro_senha,
        trilha_id
      } = req.body;
  
      const hashedPassword = await bcrypt.hash(parceiro_senha, 10);
  
      await DB.query(
        'INSERT INTO Parceiros (parceiro_nome, parceiro_email, parceiro_cnpj_cpf, parceiro_telefone, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cep, parceiro_cidade, parceiro_estado, parceiro_senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [parceiro_nome, parceiro_email, parceiro_cnpj_cpf, parceiro_telefone, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cep, parceiro_cidade, parceiro_estado, hashedPassword]
      );

      const queryIdParceiro = await DB.query(
        `SELECT parceiro_id FROM Parceiros WHERE parceiro_cnpj_cpf = '${parceiro_cnpj_cpf}'`
      )

      const idParceiro = queryIdParceiro.rows[0].parceiro_id

      await DB.query(
        `INSERT INTO ParceiroTrilha( id_parceiro, id_trilha )
        VALUES ('${idParceiro}', '${trilha_id}' )`
      )
  
      res.status(201).json({ message: 'Parceiro criado com sucesso' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
  
};

export default CadastroDeParceirosTrilha;