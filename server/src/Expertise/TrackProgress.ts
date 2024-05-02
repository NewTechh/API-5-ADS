import express from "express";
import DB from "../ConnectionDB/db";

function TrackProgress(): express.Router {

    const router = express.Router();

    router.get('/Progress/:parceiro_id', async (req, res) => {
        try {
          const { parceiro_id } = req.params;
          const trackList = new Array;

          const parceiro = await DB.query(`SELECT COUNT(id_qualificador) , trilha_nome, trilha_id 
                                          FROM ParceiroQualificador pq
                                          JOIN Qualificadores q
                                          ON q.qualificador_id = pq.id_qualificador
                                          JOIN Especializacoes e
                                          ON e.especializacao_id = q.id_especializacao
                                          JOIN Trilhas t
                                          ON t.trilha_id = e.id_trilha
                                          JOIN ParceiroTrilha pt
                                          ON pt.id_trilha = t.trilha_id
                                          WHERE pt.id_parceiro = '${parceiro_id}'
                                          GROUP BY(t.trilha_nome, t.trilha_id);`);
          
          const total = await DB.query(`SELECT COUNT(qualificador_id) , trilha_nome, trilha_id 
                                        FROM Qualificadores q
                                        JOIN Especializacoes e
                                        ON e.especializacao_id = q.id_especializacao
                                        JOIN Trilhas t
                                        ON t.trilha_id = e.id_trilha
                                        JOIN ParceiroTrilha pt
                                        ON pt.id_trilha = t.trilha_id
                                        WHERE pt.id_parceiro = '${parceiro_id}'
                                        GROUP BY(t.trilha_nome, t.trilha_id) ;`);

                                        
          for(let i =0; i< Number(total.rowCount) ; i++){
            trackList.push({trilha_id: total.rows[i].trilha_id, trilha_nome: total.rows[i].trilha_nome, totalQ: total.rows[i].count, progresso: 0})
          }
          
          for(let i =0; i< Number(trackList.length) ; i++){
              for(let j = 0; j < Number((parceiro.rowCount)); j++ ){
                if(trackList[i].trilha_id == parceiro.rows[j].trilha_id){
                  trackList[i].progresso = (parceiro.rows[j].count / trackList[i].totalQ)
                }
              }
          }
          

          
          if (total.rows.length === 0) {
            res.status(404).json({ message: 'dados não encontrados' });
          } else {
            res.status(200).json(trackList);
          }
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
    });

    return router;
};

export default TrackProgress;