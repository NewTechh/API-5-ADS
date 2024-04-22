import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function UpdatePasswordSelf(): express.Router {
    const router = express.Router();

    router.put('/updatePasswordSelf/:userId', async (req, res) => {
        try {
            const { userId } = req.params;
            const { userType, user_senha, user_senha_atual } = req.body;            

            // Consultar o banco de dados para obter a senha atual do usuário
            let tableName;
            let idFieldName;
            let passwordFieldName;
            let currentPassword;

            // Determinar o nome da tabela e o nome do campo de ID com base no tipo de usuário
            if (userType === 'Parceiro') {
                tableName = 'Parceiros';
                idFieldName = 'parceiro_id';
                passwordFieldName = "parceiro_senha";
            } else if (userType === 'Administrador') {
                tableName = 'Administradores';
                idFieldName = 'administrador_id';
                passwordFieldName = "administrador_senha";
            } else if (userType === 'Consultor de Aliança') {
                tableName = 'ConsultorAlianca';
                idFieldName = 'consultor_alianca_id';
                passwordFieldName = "consultor_alianca_senha";
            } else {
                return res.status(400).json({ message: 'Tipo de usuário inválido' });
            }

            const user = await DB.query(`SELECT ${passwordFieldName} FROM ${tableName} WHERE ${idFieldName} = $1`, [userId]);
            currentPassword = user.rows[0][passwordFieldName];

            // Verificar se a senha atual fornecida pelo usuário corresponde à senha armazenada
            const passwordMatch = await bcrypt.compare(user_senha_atual, currentPassword);
            const passwordMatch2 = await bcrypt.compare(user_senha, currentPassword);
            if (!passwordMatch) {
                return res.status(406).json({ message: 'Senha atual incorreta' });
            } else if (passwordMatch2) {
                return res.status(406).json({ message: 'A senha nova não pode ser igual a anterior.' });
            } else {
                // Hash da nova senha
                const hashedPassword = await bcrypt.hash(user_senha, 10);

                // Atualizar a senha na tabela correspondente
                await DB.query(`UPDATE ${tableName} SET ${passwordFieldName} = $1 WHERE ${idFieldName} = $2`, [hashedPassword, userId]);

                res.status(200).json({ message: 'Senha atualizada com sucesso' });
            }
        } catch (error: any) {
            console.error('Erro ao atualizar senha:', error.message);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    });

    return router;
}

export default UpdatePasswordSelf;
