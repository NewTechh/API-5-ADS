import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function AuthorizedAdmin(): express.Router {
    const router = express.Router();

    router.post('/CadastroParceirosAdmin', async (req, res) =>{
        const {administrador_nivel_acesso} = req.body;

        try{
            const userNivel = await DB.query('SELECT * FROM Administradores WHERE administrador_nivel_acesso = $4', [administrador_nivel_acesso]);
            const nivel = userNivel.rows[0];

            if (!nivel){
                return res.status(404).json({ message: 'Nivel de acesso insuficiente.' });
            }

        }catch (error: any) {
            console.error('Erro ao buscar: a', error.message);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    });
    return router
};