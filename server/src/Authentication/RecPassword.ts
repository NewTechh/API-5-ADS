import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import DB from '../ConnectionDB/db';

const jwtSecret = '779568';
const tokensAtivos = new Map();
const tokensRevogados = new Set();

// Função para enviar token por e-mail
async function enviarTokenPorEmail(email: any, token: any) {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: "newtech43@outlook.com",
            pass: "fatec11@"
        }
    });

    await transporter.sendMail({
        from: 'newtech43@outlook.com',
        to: email,
        subject: 'Seu Token',
        html: `Seu token é: <b>${token}</b>`
    });
}

function EnviarToken(): express.Router {

    const router = express.Router();

    // Rota para enviar token por e-mail
    router.post('/token', async (req, res) => {
        const { email } = req.body;
        
        try {
            // Verificar se o e-mail existe nas tabelas Parceiros, Administradores e ConsultorAlianca
            const parceiroResult = await DB.query('SELECT parceiro_id FROM Parceiros WHERE parceiro_email = $1', [email]);
            const adminResult = await DB.query('SELECT administrador_id FROM Administradores WHERE administrador_email = $1', [email]);
            const consultorResult = await DB.query('SELECT consultor_alianca_id FROM ConsultorAlianca WHERE consultor_alianca_email = $1', [email]);
            if (parceiroResult.rows.length > 0) {
                console.log('existe')
            } else if (adminResult.rows.length > 0) {
                console.log('existe')
            } else if (consultorResult.rows.length > 0) {
                console.log('existe')
            } else {
                return res.status(404).json({ message: 'Email não encontrado na base de dados.' });
            }

            // Verificar se há um token ativo para este e-mail
            if (tokensAtivos.has(email)) {
                const tokenAnterior = tokensAtivos.get(email);
                tokensRevogados.add(tokenAnterior);
            }

            // Gerar um novo token JWT com expiração em 1 hora
            const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h', algorithm: 'HS256' });
            console.log(token)
            
            // Armazenar o novo token ativo
            tokensAtivos.set(email, token);

            // Enviar o token por e-mail
            // await enviarTokenPorEmail(email, token);

            res.status(200).json({ message: 'Token enviado com sucesso' });
        } catch (error) {
            console.error('Erro ao gerar e enviar o token:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    });
    return router
}

function ValidarToken(): express.Router {

    const router = express.Router();

    // Rota para validar o token
    router.post('/validar-token', async (req, res) => {
        const { token } = req.body;

        try {
            // Verificar se o token já foi revogado
            if (tokensRevogados.has(token)) {
                return res.status(401).json({ message: 'Token inválido ou expirado' });
            }

            // Verificar se o token é válido e não expirou
            let decoded;
            try {
                decoded = jwt.verify(token, jwtSecret);
            } catch (error) {
                console.error('Erro ao decodificar o token:', error);
                return res.status(401).json({ message: 'Token inválido ou expirado' });
            }

            let email;
            if (typeof decoded === 'string') {
                // Tratar caso de erro na decodificação
                console.error('Erro ao decodificar o token:', decoded);
                return res.status(401).json({ message: 'Token inválido ou expirado' });
            } else {
                // Extrair o email do payload decodificado
                email = decoded.email;
            }

            if (tokensAtivos.get(email) !== token) {
                return res.status(401).json({ message: 'Token inválido ou expirado' });
            }

            // Revogar o token atual
            tokensRevogados.add(token);

            res.status(200).json({ message: 'Token válido' });
        } catch (error) {
            console.error('Erro ao validar o token:', error);
            res.status(401).json({ message: 'Token inválido ou expirado' });
        }
    });

    return router;
}

export {EnviarToken, ValidarToken};
