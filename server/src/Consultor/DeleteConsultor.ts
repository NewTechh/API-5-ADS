import express from 'express';
import DB from '../ConnectionDB/db';

function DeleteConsultor(): express.Router {
    const router = express.Router();

    router.delete('/Consultores/:consultor_alianca_cpf', async (req, res) => {
        const { consultor_alianca_cpf } = req.params;

        try {
            const result = await DB.query('DELETE FROM ConsultorAlianca WHERE consultor_alianca_cpf = $1', [consultor_alianca_cpf]);

            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Consultor não encontrado para exclusão' });
            } else {
                res.status(200).json({ message: 'Consultor excluído com sucesso' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ExclusaoLogicaConsultor(): express.Router {

    const router = express.Router();

    router.put('/ExclusaoConsultor/:consultor_alianca_cpf', async (req, res) => {
        try {
            const { consultor_alianca_cpf } = req.params;
        
            await DB.query(`UPDATE ConsultorAlianca SET consultor_alianca_status = FALSE WHERE consultor_alianca_cpf = '${consultor_alianca_cpf}'`);
        
            res.status(200).json({ message: 'Exclusão Lógica do consultor realizada.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ReativacaoConsultor(): express.Router {

    const router = express.Router();

    router.put('/ReativacaoConsultor/:consultor_alianca_cpf', async (req, res) => {
        try {
            const { consultor_alianca_cpf } = req.params;
        
            await DB.query(`UPDATE ConsultorAlianca SET consultor_alianca_status = TRUE WHERE consultor_alianca_cpf = '${consultor_alianca_cpf}'`);
        
            res.status(200).json({ message: 'Reativação do consultor realizada.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export {ExclusaoLogicaConsultor, ReativacaoConsultor, DeleteConsultor};