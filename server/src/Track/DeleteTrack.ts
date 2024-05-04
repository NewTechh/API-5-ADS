import express from 'express';
import DB from '../ConnectionDB/db';

function DeletarTrilha(): express.Router {
    const router = express.Router();

    router.delete('/Track/:trilha_id', async (req, res) => {
        const { trilha_id } = req.params;

        try {
            const result = await DB.query('DELETE FROM Trilhas WHERE trilha_id = $1', [trilha_id]);

            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Trilha não encontrado para exclusão' });
            } else {
                res.status(200).json({ message: 'Trilha excluído com sucesso' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export default DeletarTrilha;
