import express from "express";
import DB from "../ConnectionDB/db";

function ListarExpertiseByTrackID(): express.Router {

    const router = express.Router();

    router.get('/Expertises/:trilha_id', async (req, res) => {
        try {
          const { trilha_id } = req.params;
      
          const result = await DB.query(`SELECT * FROM Especializacoes WHERE id_trilha = '${trilha_id}';`);
      
          if (result.rows.length === 0) {
            res.status(404).json({ message: 'dados não encontrados' });
          } else {
            res.status(200).json(result.rows);
          }
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default ListarExpertiseByTrackID;