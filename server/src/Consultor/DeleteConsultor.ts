import express from 'express';
import DB from '../ConnectionDB/db';

function DeleteConsultor(): express.Router {
    const router = express.Router();

    router.delete('/Consultores/:consultor_alianca_id', async (req, res) => {
        const { consultor_alianca_id } = req.params;
        try {

            const Resulte = await DB.query('SELECT * FROM RegistroLog WHERE id_consultor_alianca = $1 ', [consultor_alianca_id]);
            if (Resulte.rowCount === 0) {
                await DB.query('DELETE FROM ConsultorAlianca WHERE consultor_alianca_id = $1; ', [consultor_alianca_id])
                res.status(200).json({ message: 'Consultor excluído com sucesso' });
            } else {
                await DB.query('DELETE FROM RegistroLog WHERE id_consultor_alianca = $1; ', [consultor_alianca_id]);
                await DB.query('DELETE FROM ConsultorAlianca WHERE consultor_alianca_id = $1; ', [consultor_alianca_id]);
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

    router.put('/ExclusaoConsultor/:consultor_alianca_id', async (req, res) => {
        try {
            const { consultor_alianca_id } = req.params;
        
            await DB.query(`UPDATE ConsultorAlianca SET consultor_alianca_status = FALSE WHERE consultor_alianca_id = '${consultor_alianca_id}'`);
        
            res.status(200).json({ message: 'Exclusão Lógica do consultor realizada.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ReativacaoConsultor(): express.Router {

    const router = express.Router();

    router.put('/ReativacaoConsultor/:consultor_alianca_id', async (req, res) => {
        try {
            const { consultor_alianca_id } = req.params;
        
            await DB.query(`UPDATE ConsultorAlianca SET consultor_alianca_status = TRUE WHERE consultor_alianca_id = '${consultor_alianca_id}'`);
        
            res.status(200).json({ message: 'Reativação do consultor realizada.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export {ExclusaoLogicaConsultor, ReativacaoConsultor, DeleteConsultor};