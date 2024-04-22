import express from 'express';
import DB from '../ConnectionDB/db';

function ListarConsultorCPF(): express.Router {

    const router = express.Router();

    router.get('/ConsultarPorCPF/:consultor_alianca_cpf', async (req, res) => {
        try {
          const { consultor_alianca_cpf } = req.params;
      
          const result = await DB.query('SELECT * FROM ConsultorAlianca WHERE consultor_alianca_cpf = $1', [consultor_alianca_cpf]);
      
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

export default ListarConsultorCPF;