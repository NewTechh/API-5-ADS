import express from 'express';
import DB from '../ConnectionDB/db';

function ListarTodosUsuarios(): express.Router{
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

function ListarTodosAdministradores(): express.Router{
    const router = express.Router();

    router.get('/Administradores', async (_, res) => {
        try {
        const result = await DB.query('SELECT * FROM Administradores;');
    
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



export default ListarTodosUsuarios; ListarAdminID; ListarTodosAdministradores;