import express from "express";
import DB from "../ConnectionDB/db";

function DeleteConsultorLog(): express.Router {
    const router = express.Router()

    router.post('/DeleteConsultorLog', async (req, res) => {
        try {
            const {registro_log_acao, registro_log_alteracao, registro_log_fluxo, id_administrador} = req.body;
            await DB.query(
            'INSERT INTO RegistroLog (registro_log_acao, registro_log_alteracao, registro_log_fluxo, id_administrador) VALUES ($1, $2, $3, $4);',
            [registro_log_acao, registro_log_alteracao, registro_log_fluxo, id_administrador]
            );

            res.status(201).json({ message: 'Log criado com sucesso' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router
};

export default DeleteConsultorLog;