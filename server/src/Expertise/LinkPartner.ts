import express from "express";
import DB from "../ConnectionDB/db";

function LinkPartner(): express.Router {

    const router = express.Router();

    router.post('/Vincular/:especializacao_id/:parceiro', async (req, res) => {
        try {
          const { especializacao_id, parceiro } = req.params;
      
          await DB.query(`INSERT INTO ParceiroEspecializacao(id_parceiro, id_especializacao) VALUES ('${parceiro}', '${especializacao_id}');`);
      
            
            res.status(201).json({ message: 'parceiro vinculado à especialização' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default LinkPartner;