import express from 'express';
import DB from '../ConnectionDB/db';

function ListarTodosUsuarios(): express.Router{
    const router = express.Router();

    router.get('/Parceiros', async (_, res) => {
        try {
        const result = await DB.query('SELECT * FROM Parceiros;');
    
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Parceiros não encontrados' });
        } else {
            res.status(200).json(result.rows[0]);
        }
        } catch (error: any) {
        res.status(500).json({ error: error.message });
        }
    });

    return router;

}

function ListarAlguns(): express.Router {
    const router = express.Router()
    console.log('Hello World');
    return router;
}

export default ListarTodosUsuarios;