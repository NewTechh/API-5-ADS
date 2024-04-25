import express from "express";
import DB from "../ConnectionDB/db";

function ListarLog(): express.Router{
    const router = express.Router();

    router.get('/Logs', async (_, res) => {
        try {
        const result = await DB.query('SELECT * FROM RegistroLog;');
    
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Logs não encontrados' });
        } else {
            res.status(200).json(result.rows);
        }
        } catch (error: any) {
        res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export default ListarLog;