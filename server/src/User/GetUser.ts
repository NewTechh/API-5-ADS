import express from 'express';
import DB from '../ConnectionDB/db';

function ListarTodosParceiros(): express.Router{
  const router = express.Router();

  router.get('/Parceiros', async (_, res) => {
      try {
      const result = await DB.query('SELECT * FROM Parceiros;');
  
      if (result.rows.length === 0) {
          res.status(404).json({ message: 'Parceiros não encontrados' });
      } else {
          res.status(200).json(result.rows);
      }
      } catch (error: any) {
      res.status(500).json({ error: error.message });
      }
  });

  return router;

}

function ListarTodosParceirosComTrilhas(): express.Router{
  const router = express.Router();

  router.get('/ParceirosTrilhas', async (_, res) => {
      try {
      const result = await DB.query(`SELECT * FROM Parceiros p
                                    JOIN ParceiroTrilha pt
                                    ON pt.id_parceiro = p.parceiro_id
                                    JOIN Trilhas t
                                    ON t.trilha_id = pt.id_trilha ;`);
  
      if (result.rows.length === 0) {
          res.status(404).json({ message: 'Parceiros não encontrados' });
      } else {
          res.status(200).json(result.rows);
      }
      } catch (error: any) {
      res.status(500).json({ error: error.message });
      }
  });

  return router;

}

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

export {ListarTodosParceiros, ListarParceiroID, ListarTodosParceirosComTrilhas};