import express from 'express';
import DB from '../ConnectionDB/db';

function ListarTracksDoParceiro(): express.Router {

    const router = express.Router();

    router.get('/TrilhasDoParceiro/:parceiro_id', async (req, res) => {
        try {
          const { parceiro_id } = req.params;

          console.log(parceiro_id)
      
          const result = await DB.query(`
          SELECT id_trilha , trilha_nome 
          FROM ParceiroTrilha pt
          JOIN Trilhas t
          ON t.trilha_id = pt.id_trilha
          WHERE pt.id_parceiro = '${parceiro_id}'
          `);

          console.log(result.rows)
      
          if (result.rows.length === 0) {
            res.status(404).json({ message: 'Parceiro não está cadastrado em nenhuma das trilhas' });
          } else {
            res.status(200).json(result.rows);
          }
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default ListarTracksDoParceiro;