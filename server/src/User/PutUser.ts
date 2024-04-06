import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function EdicaoDeParceiros(): express.Router {

    const router = express.Router();

    router.put('/Parceiros/:parceiro_id', async (req, res) => {
    try {
    const { parceiro_id } = req.params;
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
        parceiro_senha
    } = req.body;

    // Montar o objeto com os campos que foram alterados.
    const updatedFields: { [key: string]: any } = {};
    if (parceiro_nome !== undefined) updatedFields.parceiro_nome = parceiro_nome;
    if (parceiro_email !== undefined) updatedFields.parceiro_email = parceiro_email;
    if (parceiro_cnpj_cpf !== undefined) updatedFields.parceiro_cnpj_cpf = parceiro_cnpj_cpf;
    if (parceiro_telefone !== undefined) updatedFields.parceiro_telefone = parceiro_telefone;
    if (parceiro_logradouro !== undefined) updatedFields.parceiro_logradouro = parceiro_logradouro;
    if (parceiro_logradouro_numero !== undefined) updatedFields.parceiro_logradouro_numero = parceiro_logradouro_numero;
    if (parceiro_bairro !== undefined) updatedFields.parceiro_bairro = parceiro_bairro;
    if (parceiro_cep !== undefined) updatedFields.parceiro_cep = parceiro_cep;
    if (parceiro_cidade !== undefined) updatedFields.parceiro_cidade = parceiro_cidade;
    if (parceiro_estado !== undefined) updatedFields.parceiro_estado = parceiro_estado;
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
    await DB.query(queryText, [parceiro_id, ...values]);

    res.status(200).json({ message: 'Parceiro atualizado com sucesso' });
    } catch (error: any) {
    res.status(500).json({ error: error.message });
    }
    });

    return router
};

export default EdicaoDeParceiros;