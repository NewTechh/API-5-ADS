import express from "express";
import DB from "../ConnectionDB/db";

function Grafico6TrilhasConcluidas(): express.Router {

    const router = express.Router();

    router.get('/Grafico6TrilhasConcluidas', async (req, res) => {
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
            resultado.push({trilha_id: qtrilha.rows[i].id_trilha, trilha_nome: qtrilha.rows[i].trilha_nome, qtotal: qtrilha.rows[i].qtrilha, pconcluiram: 0})
          }
          
          for(let i = 0; i< Number(resultado.length); i++){
            for(let j = 0; j< Number(qparc.rowCount); j++){
                if(resultado[i].trilha_id == qparc.rows[j].trilha_id){
                    if(resultado[i].qtotal == qparc.rows[j].qparc){
                        resultado[i].pconcluiram += 1 ;
                    }
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

export default Grafico6TrilhasConcluidas;