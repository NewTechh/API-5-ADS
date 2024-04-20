import express from 'express';
import DB from '../ConnectionDB/db';

function ListarParceiroCPF(): express.Router {

    const router = express.Router();

    router.get('/ConsultaPorCPF/:parceiro_cnpj_cpf', async (req, res) => {
        try {
          const { parceiro_cnpj_cpf } = req.params;
      
          const result = await DB.query('SELECT * FROM Parceiros WHERE parceiro_cnpj_cpf = $1', [parceiro_cnpj_cpf]);
      
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

export default ListarParceiroCPF;