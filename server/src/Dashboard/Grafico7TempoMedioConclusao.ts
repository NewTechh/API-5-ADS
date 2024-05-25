import express from "express";
import DB from "../ConnectionDB/db";

function Grafico7TempoMedioConclusao(): express.Router {

    const router = express.Router();

    router.get('/Grafico7TempoMedioConclusao', async (req, res) => {
        try {
          
          const resultado = new Array();

          const qtrilha = await DB.query(`SELECT COUNT(qualificador_id) AS qtrilha, e.id_trilha, t.trilha_nome
                                        FROM Qualificadores q
                                        JOIN Especializacoes e
                                        ON e.especializacao_id = q.id_especializacao
                                        JOIN Trilhas t
                                        ON t.trilha_id = e.id_trilha
                                        GROUP BY(e.id_trilha, t.trilha_nome) ;`);

          const qparc = await DB.query(`SELECT COUNT(pq.id_qualificador) AS qparc, t.trilha_id, pt.id_parceiro
                                        FROM ParceiroQualificador pq
                                        JOIN Qualificadores q ON
                                        q.qualificador_id = pq.id_qualificador
                                        JOIN Especializacoes e ON
                                        e.especializacao_id = q.id_especializacao
                                        JOIN Trilhas t ON 
                                        t.trilha_id = e.id_trilha
                                        JOIN ParceiroTrilha pt ON
                                        pt.id_trilha = t.trilha_id
                                        WHERE pt.id_parceiro = pq.id_parceiro 
                                        GROUP BY(t.trilha_id, pt.id_parceiro) ;`);

          for(let i = 0; i<Number(qtrilha.rowCount); i++){
            resultado.push({trilha_id: qtrilha.rows[i].id_trilha, trilha_nome: qtrilha.rows[i].trilha_nome, qtotal: qtrilha.rows[i].qtrilha, media: 0, total: 0, concluiram: 0})
          }
          
          for(let i = 0; i< Number(resultado.length); i++){
            for(let j = 0; j< Number(qparc.rowCount); j++){
                if(resultado[i].trilha_id == qparc.rows[j].trilha_id){
                    if(resultado[i].qtotal == qparc.rows[j].qparc){
                        resultado[i].concluiram += 1 ;
                        const querydatas = await DB.query(`SELECT (MAX(pq_data) - MIN(pq_data)) AS tempo FROM ParceiroQualificador pq
                        JOIN Qualificadores q
                        ON q.qualificador_id = pq.id_qualificador
                        JOIN Especializacoes e 
                        ON e.especializacao_id = q.id_especializacao
                        WHERE pq.id_parceiro = '${qparc.rows[j].id_parceiro}' AND e.id_trilha = '${resultado[i].trilha_id}' `);
                        resultado[i].total += querydatas.rows[0].tempo;
                    }
                    resultado[i].media = resultado[i].total / resultado[i].concluiram;
                }
            }
          }


          if (resultado.length == 0) {
            res.status(404).json({ message: 'dados não encontrados' });
          } else {
            res.status(200).json(resultado);
          }
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default Grafico7TempoMedioConclusao;