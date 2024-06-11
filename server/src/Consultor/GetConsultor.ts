import express from 'express';
import DB from '../ConnectionDB/db';

function ListarConsultorID(): express.Router {

    const router = express.Router();

    router.get('/Consultores/:consultor_alianca_id', async (req, res) => {
        try {
          const { consultor_alianca_id } = req.params;
      
          const result = await DB.query('SELECT * FROM ConsultorAlianca WHERE consultor_alianca_id = $1', [consultor_alianca_id]);
      
          if (result.rows.length === 0) {
            res.status(404).json({ message: 'Consultor não encontrado' });
          } else {
            res.status(200).json(result.rows[0]);
          }
        } catch (error: any) { 
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};

function ListarTodosConsultores(): express.Router {
  const router = express.Router();

  router.get('/Consultores', async (req, res) => {
      try {
          const page = parseInt(req.query.page as string) || 1; // Página atual (padrão: 1)
          const pageSize = 8; // Tamanho da página fixo em 8
          const offset = (page - 1) * pageSize; // Calcular o offset

          const result = await DB.query('SELECT * FROM ConsultorAlianca LIMIT $1 OFFSET $2;', [pageSize, offset]);

          if (result.rows.length === 0) {
              res.status(404).json({ message: 'Consultores não encontrados' });
          } else {
              res.status(200).json(result.rows);
          }
      } catch (error: any) {
          res.status(500).json({ error: error.message });
      }
  });

  return router;
}

export {ListarConsultorID, ListarTodosConsultores}