import express from 'express';
import { MongoClient, ServerApiVersion } from "mongodb";
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

function InsertRelatorio(): express.Router {
    const router = express.Router();

    router.post('/InsertRelatorio', async (req, res) => {
        try {
            const { parceiroData, parceiroProgressTrilha, especializacao, consultorData } = req.body;

            delete parceiroData.parceiro_senha;
            delete parceiroData.parceiro_status;
            delete parceiroData.parceiro_id;

            // Remove campos indesejados de cada objeto em parceiroProgressTrilha
            parceiroProgressTrilha.forEach((trilha: any) => {
                delete trilha.trilha_id;
            });

            // Remove campos indesejados de cada objeto em especializacao
            especializacao.forEach((esp: any) => {
                delete esp.especializacao_id;
            });

            // Verifique se os arrays não estão vazios
            if (!Array.isArray(parceiroProgressTrilha) || parceiroProgressTrilha.length === 0) {
                throw new Error('Array parceiroProgressTrilha está vazio ou não é um array.');
            }
            if (!Array.isArray(especializacao) || especializacao.length === 0) {
                throw new Error('Array especializacao está vazio ou não é um array.');
            }

            // Conecta ao banco de dados MongoDB
            const uri = "mongodb+srv://root:fatec11@api5ads.ppfvmsl.mongodb.net/?retryWrites=true&w=majority&appName=API5ADS";
            const client = new MongoClient(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });

            await client.connect();
            const database = client.db("API5");
            const collection = database.collection("Relatorio");

            // Cria um objeto combinado para inserir no MongoDB
            const document = {
                parceiroData,
                parceiroProgressTrilha,
                especializacao
            };

            // Insere o documento na coleção "Relatorio"
            const result = await collection.insertOne(document);

            if (result.acknowledged) {
                console.log("Documento inserido com sucesso!");
                res.status(200).send("Documento inserido com sucesso!");

                // Gera o PDF com os dados do parceiro e envia por e-mail
                await generatePDFAndSendEmail(parceiroData, parceiroProgressTrilha, especializacao, consultorData);
            } else {
                console.log("Erro ao inserir documento.");
                res.status(500).send("Erro ao inserir documento.");
            }
        } catch (error) {
            console.error("Erro ao inserir dados do parceiro:", error);
            if (!res.headersSent) {
                res.status(500).send("Erro ao inserir dados do parceiro.");
            }
        }
    });

    return router;
}

async function generatePDFAndSendEmail(parceiroData: any, parceiroProgressTrilha: any, especializacao: any, consultorData: any) {
    
    delete parceiroData.parceiro_senha;
    delete parceiroData.parceiro_status;
    delete parceiroData.parceiro_id;

    const labelMapping: any = {
        parceiro_nome: 'Nome do Parceiro',
        parceiro_email: 'Email do Parceiro',
        parceiro_cnpj_cpf: 'CNPJ',
        parceiro_telefone: 'Telefone',
        parceiro_logradouro: 'Logradouro',
        parceiro_logradouro_numero: 'Número do Logradouro',
        parceiro_bairro: 'Bairro',
        parceiro_cep: 'CEP',
        parceiro_cidade: 'Cidade',
        parceiro_estado: 'Estado'
    };

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
        const doc = new PDFDocument();
        const chunks: any[] = [];
        let buffer: Buffer;

        doc.on('data', (chunk: any) => {
            chunks.push(chunk);
        });

        doc.on('end', () => {
            buffer = Buffer.concat(chunks);
            resolve(buffer);
        });

        // Adicione o conteúdo do PDF
        doc.fontSize(14).text('Dados do Parceiro:', { underline: true }).moveDown();
        Object.keys(parceiroData).forEach(key => {
            const label = labelMapping[key] || key;
            doc.fontSize(11).text(`${label}: ${parceiroData[key]}`).moveDown();
        });

        parceiroProgressTrilha.forEach((trilha: any) => {
            doc.fontSize(16).text(`Trilha: ${trilha.trilha_nome}`, { underline: true }).moveDown();
            doc.fontSize(12).text(`Total de Questões: ${trilha.totalQ}`).moveDown();
            doc.fontSize(12).text(`Progressão Total: ${trilha.progresso}%`).moveDown().moveDown();
        });

        especializacao.forEach((esp: any) => {
            doc.fontSize(14).text(`Especialização: ${esp.especializacao_nome}`).moveDown();
            doc.fontSize(12).text(`Questões: ${esp.totalQ}`).moveDown();
            doc.fontSize(12).text(`Progresso: ${esp.progresso}%`).moveDown().moveDown();
        });

        doc.end();
    });

    // Construa o conteúdo do e-mail
    const emailContent = {
        from: 'newtech43@outlook.com',
        to: consultorData.consultor_alianca_email,
        subject: 'Relatório Parceiro',
        text: 'Segue em anexo o relatório do parceiro.',
        attachments: [
            {
                filename: 'relatorio.pdf',
                content: pdfBuffer,
            },
        ],
    };

    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: "newtech43@outlook.com",
            pass: "fatec11@"
        }
    });

    try {
        // Enviar e-mail
        const info = await transporter.sendMail(emailContent);
        console.log('E-mail enviado:', info.response);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}

export default InsertRelatorio;
