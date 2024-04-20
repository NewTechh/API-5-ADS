import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function UpdatePassword(): express.Router {
    const router = express.Router();

    router.put('/updatePassword', async (req, res) => {
        try {
            const { userId, userType, user_senha } = req.body;

            // Hash da nova senha
            const hashedPassword = await bcrypt.hash(user_senha, 10);

            let tableName;
            let idFieldName;
            let passwordFieldName;

            // Determinar o nome da tabela e o nome do campo de ID com base no tipo de usuário
            if (userType === 'Parceiro') {
                tableName = 'Parceiros';
                idFieldName = 'parceiro_id';
                passwordFieldName = "parceiro_senha";
            } else if (userType === 'Administrador') {
                tableName = 'Administradores';
                idFieldName = 'administrador_id';
                passwordFieldName = "administrador_senha";
            } else if (userType === 'Consultor') {
                tableName = 'ConsultorAlianca';
                idFieldName = 'consultor_alianca_id';
                passwordFieldName = "consultor_alianca_senha";
            } else {
                return res.status(400).json({ message: 'Tipo de usuário inválido' });
            }

            // Atualizar a senha na tabela correspondente
            await DB.query(`UPDATE ${tableName} SET ${passwordFieldName} = $1 WHERE ${idFieldName} = $2`, [hashedPassword, userId]);

            res.status(200).json({ message: 'Senha atualizada com sucesso' });
        } catch (error: any) {
            console.error('Erro ao atualizar senha:', error.message);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    });

    return router;
}

export default UpdatePassword;
