import express from 'express';
import DB from '../ConnectionDB/db';

function GraficoCountPartnerByTrack(): express.Router{
    const router = express.Router();

    router.get('/graficoParceirosPorTrilha', async (_, res) => {
        try {
        const result = await DB.query(`SELECT COUNT(id_parceiro) , trilha_nome , trilha_id
                                        FROM ParceiroTrilha pt
                                        JOIN Trilhas t 
                                        ON t.trilha_id = pt.id_trilha
                                        GROUP BY(t.trilha_nome, t.trilha_id);`);
    
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

export default GraficoCountPartnerByTrack;