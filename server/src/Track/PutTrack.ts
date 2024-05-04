import express from 'express';
import DB from '../ConnectionDB/db';

function EdicaoTrilha(): express.Router {

    const router = express.Router();

    router.put('/Track/:trilha_id', async (req, res) => {
        try {
            const { trilha_id } = req.params;
            const {
                trilha_nome,
            } = req.body;

            await DB.query(
                'UPDATE Trilhas SET trilha_nome=$1 WHERE trilha_id=$2;',
                [trilha_nome, trilha_id]
                );

            res.status(200).json({ message: 'Trilha atualizada com sucesso' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router
};

export default EdicaoTrilha;