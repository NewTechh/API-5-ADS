import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function Login(): express.Router {
  const router = express.Router();

  router.post('/login', async (req, res) => {
      const { parceiro_email, parceiro_senha } = req.body;

      try {
            // Verificar se o usuário existe na tabela de parceiros
            const parceiroResult = await DB.query('SELECT * FROM parceiros WHERE parceiro_email = $1 AND parceiro_status = TRUE', [parceiro_email]);
            const parceiro = parceiroResult.rows[0];

            // Verificar se o usuário existe na tabela de administradores
            const adminResult = await DB.query('SELECT * FROM administradores WHERE administrador_email = $1 AND administrador_status = TRUE', [parceiro_email]);
            const admin = adminResult.rows[0];

            // Verificar se o usuário existe na tabela de administradores
            const alianceResult = await DB.query('SELECT * FROM ConsultorAlianca WHERE consultor_alianca_email = $1 AND consultor_alianca_status = TRUE', [parceiro_email]);
            const aliance = alianceResult.rows[0];

          let userId = '';
          let userType = '';

            if (parceiro) {
                userId = parceiro.parceiro_id;
                userType = 'Parceiro';
            } else if (admin) {
                userId = admin.administrador_id;
                userType = 'Administrador';
            } else if (aliance) {
                userId = aliance.consultor_alianca_id;
                userType = 'Consultor de Aliança';
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado ou inativo.' });
            }

          // Verificar se a senha está correta
          const passwordMatch = await bcrypt.compare(parceiro_senha, parceiro ? parceiro.parceiro_senha : admin ? admin.administrador_senha : aliance ? aliance.consultor_alianca_senha : '');

          if (!passwordMatch) {
              return res.status(401).json({ message: 'Credenciais inválidas' });
          }

          // Se tudo estiver correto, enviar uma resposta de sucesso com o ID do usuário e o tipo
          res.status(200).json({ message: 'Login bem-sucedido', userId, userType});
      } catch (error: any) {
          console.error('Erro ao fazer login:', error.message);
          res.status(500).json({ message: 'Erro interno do servidor' });
      }
  });

  return router;
}


export default Login; 