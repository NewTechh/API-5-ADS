import express from 'express';
import DB from '../ConnectionDB/db';

function EdicaoDeConsultores(): express.Router {

    const router = express.Router();

    router.put('/Consultores/:consultor_alianca_id', async (req, res) => {
    try {
    const { consultor_alianca_id } = req.params;
    const {
        consultor_alianca_nome,
        consultor_alianca_email,
    } = req.body;

    // Montar o objeto com os campos que foram alterados.
    const updatedFields: { [key: string]: any } = {};
    if (consultor_alianca_nome !== undefined) updatedFields.consultor_alianca_nome = consultor_alianca_nome;
    if (consultor_alianca_email !== undefined) updatedFields.consultor_alianca_email = consultor_alianca_email;

    // Montar a query SQL para atualizar apenas os campos alterados
    const fields = Object.keys(updatedFields);
    const values = Object.values(updatedFields);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');

    // Atualizar as informações do parceiro no banco de dados
    const queryText = `UPDATE ConsultorAlianca SET ${setClause} WHERE consultor_alianca_id = $1`;
    await DB.query(queryText, [consultor_alianca_id, ...values]);

    res.status(200).json({ message: 'Consultor atualizado com sucesso' });
    } catch (error: any) {
    res.status(500).json({ error: error.message });
    }
    });

    return router
};

export default EdicaoDeConsultores;