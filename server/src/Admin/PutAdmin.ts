import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function EdicaoAdmin(): express.Router {
    const router = express.Router();

    router.put('/Administradores/:administrador_id', async (req, res) => {
    try {
    const { administrador_id } = req.params;
    const {
        administrador_nome,
        administrador_email,
        administrador_senha,
        administrador_nivel_acesso
    } = req.body;

    const updatedFields: { [key: string]: any } = {};
    if (administrador_nome !== undefined) updatedFields.administrador_nome = administrador_nome;
    if (administrador_email !== undefined) updatedFields.administrador_email = administrador_email;
    if (administrador_senha !== undefined) updatedFields.administrador_senha = administrador_senha;
    if (administrador_nivel_acesso !== undefined) {
        const hashedPassword = await bcrypt.hash(administrador_senha, 10);
        updatedFields.administrador_senha = hashedPassword;
    }
    const fields = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

    const queryText = `UPDATE Administradores SET ${setClause} WHERE administrador_id = $1`;
    await DB.query(queryText, [administrador_id, ...values]);

    res.status(200).json({ message: 'Parceiro atualizado com sucesso' });
    } catch (error: any) {
    res.status(500).json({ error: error.message });
    }
    });
    return router
};

export default EdicaoAdmin;