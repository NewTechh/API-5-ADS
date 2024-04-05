import express from 'express';
import bcrypt from 'bcrypt';
import DB from '../ConnectionDB/db';

function Login(): express.Router {
    const router = express.Router();

    router.post('/login', async (req, res) => {
        const { parceiro_email, parceiro_senha } = req.body;
      
        try {
          // Verificar se o usuário existe no banco
          const userResult = await DB.query('SELECT * FROM parceiros WHERE parceiro_email = $1', [parceiro_email]);
          const user = userResult.rows[0];
      
          if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
          }
      
          // Verificar se a senha está correta
          const passwordMatch = await bcrypt.compare(parceiro_senha, user.parceiro_senha);
      
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
          }
      
          // Se tudo estiver correto, enviar uma resposta de sucesso
          res.status(200).json({ message: 'Login bem-sucedido' });
        } catch (error: any) {
          console.error('Erro ao fazer login:', error.message);
          res.status(500).json({ message: 'Erro interno do servidor' });
        }
      });

    return router
};

export default Login; 