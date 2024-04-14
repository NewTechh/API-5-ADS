import express from 'express';
import DB from '../ConnectionDB/db';

function DeleteUser(): express.Router {
    const router = express.Router();

    router.delete('/Parceiros/:parceiro_id', async (req, res) => {
        const { parceiro_id } = req.params;

        try {
            const result = await DB.query('DELETE FROM Parceiros WHERE id = $1', [parceiro_id]);

            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Usuário não encontrado para exclusão' });
            } else {
                res.status(200).json({ message: 'Usuário excluído com sucesso' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export default DeleteUser;
