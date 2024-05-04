import express from "express";
import DB from "../ConnectionDB/db";

function LinkPartner(): express.Router {

    const router = express.Router();

    router.post('/Vincular/:qualificador_id/:parceiro_id', async (req, res) => {
        try {
          const { qualificador_id, parceiro_id } = req.params;
      
          await DB.query(`INSERT INTO ParceiroQualificador(id_parceiro, id_qualificador) VALUES ('${parceiro_id}', '${qualificador_id}');`);
      
            
            res.status(201).json({ message: 'qualificador vinculado ao parceiro' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default LinkPartner;