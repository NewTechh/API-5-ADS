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

export default CadastroDeAdmin;