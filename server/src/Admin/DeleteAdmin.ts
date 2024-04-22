import express from 'express';
import DB from '../ConnectionDB/db';

function DeleteAdmin(): express.Router {
    const router = express.Router();

    router.delete('/Administradores/:administrador_cpf', async (req, res) => {
        const { administrador_cpf } = req.params;

        try {
            const result = await DB.query('DELETE FROM Administradores WHERE administrador_cpf = $1', [administrador_cpf]);

            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Adminisrador não encontrado para exclusão' });
            } else {
                res.status(200).json({ message: 'Administrador excluído com sucesso' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ExclusaoLogicaAdmin(): express.Router {

    const router = express.Router();

    router.put('/ExclusaoAdmin/:administrador_cpf', async (req, res) => {
        try {
            const { administrador_cpf } = req.params;
        
            await DB.query(`UPDATE Administradores SET administrador_status = FALSE WHERE administrador_cpf = '${administrador_cpf}'`);
        
            res.status(200).json({ message: 'Exclusão Lógica do administrador realizada.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ReativacaoAdmin(): express.Router {

    const router = express.Router();

    router.put('/ReativacaoAdmin/:administrador_cpf', async (req, res) => {
        try {
            const { administrador_cpf } = req.params;
        
            await DB.query(`UPDATE Administradores SET administrador_status = TRUE WHERE administrador_cpf = '${administrador_cpf}'`);
        
            res.status(200).json({ message: 'Reativação do administrador realizada.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export {DeleteAdmin, ExclusaoLogicaAdmin, ReativacaoAdmin};
