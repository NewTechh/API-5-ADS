import express from 'express';
import DB from '../ConnectionDB/db';

function DeleteUser(): express.Router {
    const router = express.Router();

    router.delete('/Parceiros/:parceiro_cnpj_cpf', async (req, res) => {
        const { parceiro_cnpj_cpf } = req.params;

        try {
            const result = await DB.query('DELETE FROM Parceiros WHERE parceiro_cnpj_cpf = $1', [parceiro_cnpj_cpf]);

            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Parceiro não encontrado para exclusão' });
            } else {
                res.status(200).json({ message: 'Parceiro excluído com sucesso' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ExclusaoLogicaParceiro(): express.Router {

    const router = express.Router();

    router.put('/ExclusaoParceiro/:parceiro_cnpj_cpf', async (req, res) => {
        try {
            const { parceiro_cnpj_cpf } = req.params;
            
            await DB.query(`UPDATE Parceiros SET parceiro_status = FALSE WHERE parceiro_cnpj_cpf = $1`, [parceiro_cnpj_cpf]);
        
            res.status(200).json({ message: 'Exclusão Lógica do parceiro realizada.', status: false });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

function ReativacaoParceiro(): express.Router {

    const router = express.Router();

    router.put('/ReativacaoParceiro/:parceiro_cnpj_cpf', async (req, res) => {
        try {
            const { parceiro_cnpj_cpf } = req.params;
        
            await DB.query(`UPDATE Parceiros SET parceiro_status = TRUE WHERE parceiro_cnpj_cpf = $1`, [parceiro_cnpj_cpf]);
        
            res.status(200).json({ message: 'Reativação do parceiro realizada.', status: true });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}

export {DeleteUser, ExclusaoLogicaParceiro, ReativacaoParceiro};
