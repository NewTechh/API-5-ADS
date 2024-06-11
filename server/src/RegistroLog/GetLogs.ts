import express from "express";
import DB from "../ConnectionDB/db";

function ListarLog(): express.Router{
    const router = express.Router();

    router.get('/Logs', async (req, res) => {
        try {
            const page = parseInt(req.query.page as string) || 1; // Página atual (padrão: 1)
            const pageSize = 5; // Tamanho da página fixo em 10
            const offset = (page - 1) * pageSize; // Calcular o offset
            const result = await DB.query('SELECT * FROM RegistroLog LIMIT $1 OFFSET $2;', [pageSize, offset]);
    
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