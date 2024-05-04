import express from 'express';
import DB from '../ConnectionDB/db';

function ListarTrilhas(): express.Router{
    const router = express.Router();

    router.get('/listar', async (_, res) => {
        try {
        const result = await DB.query('SELECT * FROM Trilhas;');
    
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Registros não encontrados' });
        } else {
            res.status(200).json(result.rows);
        }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;

}

export default ListarTrilhas;