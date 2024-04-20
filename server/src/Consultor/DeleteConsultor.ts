import express from 'express';
import DB from '../ConnectionDB/db';

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

export {ExclusaoLogicaConsultor, ReativacaoConsultor};