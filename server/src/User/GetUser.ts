import express from 'express';
import DB from '../ConnectionDB/db';

function ListarParceiroID(): express.Router {

    const router = express.Router();

    router.get('/Parceiros/:parceiro_id', async (req, res) => {
        try {
          const { parceiro_id } = req.params;
      
          const result = await DB.query('SELECT * FROM Parceiros WHERE parceiro_id = $1', [parceiro_id]);
      
          if (result.rows.length === 0) {
            res.status(404).json({ message: 'Parceiro não encontrado' });
          } else {
            res.status(200).json(result.rows[0]);
          }
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default ListarParceiroID;