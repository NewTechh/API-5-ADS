import express from 'express';
import DB from '../ConnectionDB/db';

function DeleteUser(): express.Router {
    const router = express.Router();

    router.delete('/Parceiros/:parceiro_id', async (req, res) => {
        const { parceiro_id } = req.params;

        try {
            const Resulte = await DB.query('SELECT * FROM RegistroLog WHERE id_parceiro = $1 ', [parceiro_id]);
            if (Resulte.rowCount === 0) {
                await DB.query('DELETE FROM Parceiros WHERE parceiro_id = $1; ', [parceiro_id])
                res.status(200).json({ message: 'Consultor excluído com sucesso' });
            } else {
                await DB.query('DELETE FROM RegistroLog WHERE id_parceiro = $1; ', [parceiro_id]);
                await DB.query('DELETE FROM Parceiros WHERE parceiro_id = $1; ', [parceiro_id]);
                res.status(200).json({ message: 'Consultor excluído com sucesso' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ExclusaoLogicaParceiro(): express.Router {

    const router = express.Router();

    router.put('/ExclusaoParceiro/:parceiro_id', async (req, res) => {
        try {
            const { parceiro_id } = req.params;
            
            await DB.query(`UPDATE Parceiros SET parceiro_status = FALSE WHERE parceiro_cnpj_cpf = $1`, [parceiro_id]);
        
            res.status(200).json({ message: 'Exclusão Lógica do parceiro realizada.', status: false });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ReativacaoParceiro(): express.Router {

    const router = express.Router();

    router.put('/ReativacaoParceiro/:parceiro_id', async (req, res) => {
        try {
            const { parceiro_id } = req.params;
        
            await DB.query(`UPDATE Parceiros SET parceiro_status = TRUE WHERE parceiro_id = $1`, [parceiro_id]);
        
            res.status(200).json({ message: 'Reativação do parceiro realizada.', status: true });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export {DeleteUser, ExclusaoLogicaParceiro, ReativacaoParceiro};
