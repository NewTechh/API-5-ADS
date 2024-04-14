import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function EdicaoDeAdmin(): express.Router {

    const router = express.Router();

    router.put('/Administradores/:administrador_id', async (req, res) => {
    try {
    const { administrador_id } = req.params;
    const {
        administrador_nome,
        administrador_email,
        administrador_matricula,
        administrador_funcao,
        administrador_setor,
        administrador_senha
    
    } = req.body;

    // Montar o objeto com os campos que foram alterados.
    const updatedFields: { [key: string]: any } = {};
    if (administrador_nome !== undefined) updatedFields.administrador_nome = administrador_nome;
    if (administrador_email !== undefined) updatedFields.administrador_email = administrador_email;
    if (administrador_matricula !== undefined) updatedFields.administrador_matricula = administrador_matricula;
    if (administrador_funcao!== undefined) updatedFields.administrador_funcao = administrador_funcao;
    if (administrador_setor!== undefined) updatedFields.administrador_setor = administrador_setor;
    if (administrador_senha !== undefined) {
        const hashedPassword = await bcrypt.hash(administrador_senha, 10);
        updatedFields.administrador_senha = hashedPassword;
    }

    // Montar a query SQL para atualizar apenas os campos alterados
    const fields = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

    // Atualizar as informações do parceiro no banco de dados
    const queryText = `UPDATE Administrador SET ${setClause} WHERE administrador_id = $1`;
    await DB.query(queryText, [administrador_id, ...values]);

    res.status(200).json({ message: 'Administrador atualizado com sucesso' });
    } catch (error: any) {
    res.status(500).json({ error: error.message });
    }
    });

    return router
};

export default EdicaoDeAdmin;