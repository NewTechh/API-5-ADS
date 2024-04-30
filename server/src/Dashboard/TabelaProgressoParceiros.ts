import express from "express";
import DB from "../ConnectionDB/db";

function TabelaProgressoParceiros(): express.Router {

    const router = express.Router();

    router.get('/ParceirosProgresso', async (req, res) => {
        try {
          
          const trackList = new Array;

          const parceiro = await DB.query(`SELECT COUNT(id_qualificador), parceiro_nome, trilha_nome, id_trilha
                                            FROM ParceiroQualificador pq
                                            JOIN Qualificadores q 
                                            ON q.qualificador_id = pq.id_qualificador
                                            JOIN Especializacoes e
                                            ON e.especializacao_id = q.id_especializacao
                                            JOIN Trilhas t
                                            ON t.trilha_id = e.id_trilha
                                            JOIN Parceiros p 
                                            ON p.parceiro_id = pq.id_parceiro
                                            GROUP BY(parceiro_nome, trilha_nome, id_trilha);`);
          
          const total = await DB.query(`SELECT COUNT(qualificador_id), id_trilha
                                        FROM Qualificadores q
                                        JOIN Especializacoes e
                                        ON e.especializacao_id = q.id_especializacao
                                        GROUP BY(e.id_trilha) ;`);

                                        
          for(let i =0; i< Number(parceiro.rowCount) ; i++){
            trackList.push({parceiro_nome: parceiro.rows[i].parceiro_nome, trilha_nome: parceiro.rows[i].trilha_nome, trilha_id: parceiro.rows[i].id_trilha, progresso: parceiro.rows[i].count })
          }
          
          for(let i =0; i< Number(trackList.length) ; i++){
              for(let j = 0; j < Number((total.rowCount)); j++ ){
                if(trackList[i].trilha_id == total.rows[j].id_trilha){
                  trackList[i].progresso = (trackList[i].progresso / total.rows[j].count)
                }
              }
          }
          

          
          if (parceiro.rows.length === 0) {
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

export default TabelaProgressoParceiros;