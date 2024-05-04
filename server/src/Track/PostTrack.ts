import express from "express";
import DB from "../ConnectionDB/db";

function CadastroTrilha(): express.Router {
    const router = express.Router()

    router.post('/CadastroTrilha', async (req, res) => {
        try {
            const {
                trilha_nome,
            } = req.body;

            await DB.query(
            'INSERT INTO Trilhas (trilha_nome) VALUES ($1);',
            [trilha_nome]
            );

            res.status(201).json({ message: 'Trilha criada com sucesso' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router
};

export default CadastroTrilha;