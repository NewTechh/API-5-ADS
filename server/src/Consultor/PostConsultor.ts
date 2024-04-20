import express from "express";
import bcrypt from 'bcrypt';
import DB from "../ConnectionDB/db";

function CadastroConsultor(): express.Router {
    const router = express.Router()

    router.post('/CadastroConsultor', async (req, res) => {
        try {
            const {
            consultor_alianca_nome,
            consultor_alianca_cpf,
            consultor_alianca_email,
            consultor_alianca_senha
            } = req.body;

            const hashedPassword = await bcrypt.hash(consultor_alianca_senha, 10);

            await DB.query(
            'INSERT INTO ConsultorAlianca (consultor_alianca_nome, consultor_alianca_cpf, consultor_alianca_email, consultor_alianca_senha) VALUES ($1, $2, $3, $4);',
            [consultor_alianca_nome, consultor_alianca_cpf, consultor_alianca_email, hashedPassword]
            );

            res.status(201).json({ message: 'Consultor criado com sucesso' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router
};

export default CadastroConsultor;