import express from 'express';
import DB from '../ConnectionDB/db';

function DeleteAdmin(): express.Router {
    const router = express.Router();

    router.delete('/Administradores/:administrador_id', async (req, res) => {
        const { administrador_id } = req.params;

        try {
            const result = await DB.query('DELETE FROM Administradores WHERE id = $1', [administrador_id]);

            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Adminisrador não encontrado para exclusão' });
            } else {
                res.status(200).json({ message: 'Administrador excluído com sucesso' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export default DeleteAdmin;
