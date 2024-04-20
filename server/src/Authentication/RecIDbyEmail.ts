import express from 'express';
import DB from '../ConnectionDB/db';

function EmailPorID(): express.Router {
    const router = express.Router();

    router.get('/emailPorID/:email', async (req, res) => {
        try {
            const { email } = req.params;

            // Consultar na tabela de parceiros
            const parceiroResult = await DB.query('SELECT parceiro_id FROM Parceiros WHERE parceiro_email = $1', [email]);
            if (parceiroResult.rows.length > 0) {
                const { parceiro_id } = parceiroResult.rows[0];
                return res.status(200).json({ userId: parceiro_id, userType: 'Parceiro' });
            }

            // Consultar na tabela de administradores
            const adminResult = await DB.query('SELECT administrador_id FROM Administradores WHERE administrador_email = $1', [email]);
            if (adminResult.rows.length > 0) {
                const { administrador_id } = adminResult.rows[0];
                return res.status(200).json({ userId: administrador_id, userType: 'Administrador' });
            }

            // Consultar na tabela de consultores
            const consultorResult = await DB.query('SELECT consultor_alianca_id FROM ConsultorAlianca WHERE consultor_alianca_email = $1', [email]);
            if (consultorResult.rows.length > 0) {
                const { consultor_alianca_id } = consultorResult.rows[0];
                return res.status(200).json({ userId: consultor_alianca_id, userType: 'Consultor' });
            }

            // Se nenhum usuário for encontrado
            return res.status(404).json({ message: 'Usuário não encontrado' });
        } catch (error: any) {
            console.error('Erro ao buscar usuário por email:', error.message);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    });

    return router;
}

export default EmailPorID;
