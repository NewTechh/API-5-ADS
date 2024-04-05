import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function CadastroDeAdmin(): express.Router {
    const router = express.Router()

    router.post('/CadastroADMIN', async (req, res) => {
        try {
            const {
            administrador_nome,
            administrador_email,
            administrador_senha,
            administrador_nivel_acesso,
            } = req.body;

            const hashedPassword = await bcrypt.hash(administrador_senha, 10);

            await DB.query(
            'INSERT INTO Administradores(administrador_nome, administrador_email, administrador_senha, administrador_nivel_acesso) VALUES ($1, $2, $3, $4);',
            [administrador_nome, administrador_email, hashedPassword, administrador_nivel_acesso]
            );

            res.status(201).json({ message: 'Administrador criado com sucesso' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router
};

function CadastroDeParceirosAdmin(): express.Router {
    const router = express.Router()

    router.post('/CadastroParceirosAdmin', async (req, res) => {
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
          
              await DB.query(
                'INSERT INTO Parceiros (parceiro_nome, parceiro_email, parceiro_cnpj_cpf, parceiro_telefone, parceiro_expertises, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cep, parceiro_cidade, parceiro_estado, parceiro_pais, parceiro_senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
                [parceiro_nome, parceiro_email, parceiro_cnpj_cpf, parceiro_telefone, parceiro_expertises, parceiro_logradouro, parceiro_logradouro_numero, parceiro_bairro, parceiro_cep, parceiro_cidade, parceiro_estado, parceiro_pais, hashedPassword]
              );
          
              res.status(201).json({ message: 'Parceiro criado com sucesso' });
            } catch (error: any) {
              res.status(500).json({ error: error.message });
            }
          
    });

    return router
};

export default CadastroDeParceirosAdmin; CadastroDeAdmin;