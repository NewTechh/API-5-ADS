import express from "express";
import DB from "../ConnectionDB/db";

function GetExpProgress(): express.Router {

    const router = express.Router();

    router.get('/Progress/:trilha_id/:parceiro_id', async (req, res) => {
        try {
          const { trilha_id , parceiro_id } = req.params;
          const expList = new Array;

          const parceiro = await DB.query(`SELECT COUNT(id_qualificador), especializacao_id, especializacao_nome
                                        FROM ParceiroQualificador pq
                                        JOIN Qualificadores q
                                        ON pq.id_qualificador = q.qualificador_id
                                        JOIN Especializacoes e
                                        ON e.especializacao_id = q.id_especializacao
                                        JOIN Trilhas t
                                        ON t.trilha_id = e.id_trilha
                                        WHERE pq.id_parceiro = '${parceiro_id}'
                                        AND e.id_trilha = '${trilha_id}'
                                        GROUP BY(especializacao_id);`);
          
          const total = await DB.query(`SELECT COUNT(qualificador_id), especializacao_nome, id_especializacao 
                                        FROM Qualificadores q
                                        JOIN Especializacoes e 
                                        ON e.especializacao_id = q.id_especializacao
                                        JOIN Trilhas t
                                        ON t.trilha_id = e.id_trilha
                                        WHERE e.id_trilha = '${trilha_id}'
                                        GROUP BY(e.especializacao_nome, q.id_especializacao);`);

                                        
          for(let i =0; i< Number(total.rowCount) ; i++){
            expList.push({especializacao_id: total.rows[i].id_especializacao, especializacao_nome: total.rows[i].especializacao_nome, totalQ: total.rows[i].count, progresso: 0})
          }
          
          for(let i =0; i< Number(expList.length) ; i++){
              for(let j = 0; j < Number((parceiro.rowCount)); j++ ){
                if(expList[i].especializacao_id == parceiro.rows[j].especializacao_id){
                  expList[i].progresso = (parceiro.rows[j].count / expList[i].totalQ)
                }
              }
          }
          

          
          if (parceiro.rows.length === 0) {
            res.status(404).json({ message: 'dados não encontrados' });
          } else {
            res.status(200).json(expList);
          }
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default GetExpProgress;