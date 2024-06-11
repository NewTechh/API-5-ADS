import express from 'express';
import DB from '../ConnectionDB/db';

function ListarTodosAdministradores(): express.Router{
    const router = express.Router();

    router.get('/Administradores', async (req, res) => {
        try {
          const page = parseInt(req.query.page as string) || 1; // Página atual (padrão: 1)
          const pageSize = 8; // Tamanho da página fixo em 10
          const offset = (page - 1) * pageSize; // Calcular o offset
        const result = await DB.query('SELECT * FROM Administradores LIMIT $1 OFFSET $2;', [pageSize, offset]);
    
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Administradores não encontrados' });
        } else {
            res.status(200).json(result.rows);
        }
        } catch (error: any) {
        res.status(500).json({ error: error.message });
        }
    });

    return router;

}

function ListarAdminID(): express.Router {

    const router = express.Router();

    router.get('/Administradores/:administrador_id', async (req, res) => {
        try {
          const { administrador_id } = req.params;
      
          const result = await DB.query('SELECT * FROM Administradores WHERE administrador_id = $1', [administrador_id]);
      
          if (result.rows.length === 0) {
            res.status(404).json({ message: 'Administrador não encontrado' });
          } else {
            res.status(200).json(result.rows[0]);
          }
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};



export {ListarAdminID, ListarTodosAdministradores}