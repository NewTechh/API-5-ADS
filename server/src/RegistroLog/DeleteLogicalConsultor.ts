import express from "express";
import DB from "../ConnectionDB/db";

function DeleteLogicalConsultorLog(): express.Router {
    const router = express.Router()

    router.post('/DeleteLogicalConsultorLog', async (req, res) => {
        try {
            const {registro_log_acao, registro_log_alteracao, registro_log_fluxo, id_administrador, id_consultor_alianca} = req.body;
            await DB.query(
            'INSERT INTO RegistroLog (registro_log_acao, registro_log_alteracao, registro_log_fluxo, id_administrador, id_consultor_alianca) VALUES ($1, $2, $3, $4, $5);',
            [registro_log_acao, registro_log_alteracao, registro_log_fluxo, id_administrador, id_consultor_alianca]
            );

            res.status(201).json({ message: 'Log criado com sucesso' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router
};

export default DeleteLogicalConsultorLog;