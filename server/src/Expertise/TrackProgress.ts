import express from "express";
import DB from "../ConnectionDB/db";

function TrackProgress(): express.Router {

    const router = express.Router();

    router.get('/Progress/:parceiro_id', async (req, res) => {
        try {
          const { parceiro_id } = req.params;
          const trackList = new Array;

          const parceiro = await DB.query(`SELECT COUNT(id_especializacao), trilha_id, trilha_nome
                                        FROM ParceiroEspecializacao pe
                                        JOIN Especializacoes e
                                        ON pe.id_especializacao = e.especializacao_id
                                        JOIN Trilhas t
                                        ON e.id_trilha = t.trilha_id
                                        WHERE pe.id_parceiro = '${parceiro_id}' 
                                        GROUP BY(trilha_id);`);
          
          const total = await DB.query(`SELECT COUNT(especializacao_id), trilha_nome, id_trilha 
                                        FROM Especializacoes 
                                        JOIN Trilhas ON Trilhas.trilha_id = Especializacoes.id_trilha
                                        GROUP BY(trilha_nome, id_trilha);`);

                                        
          for(let i =0; i< Number(total.rowCount) ; i++){
            trackList.push({trilha_id: total.rows[i].id_trilha, trilha_nome: total.rows[i].trilha_nome, totalExp: total.rows[i].count, progresso: 0})
          }
          
          for(let i =0; i< Number(trackList.length) ; i++){
              for(let j = 0; j < Number((parceiro.rowCount)); j++ ){
                if(trackList[i].trilha_id == parceiro.rows[j].trilha_id){
                  trackList[i].progresso = (parceiro.rows[j].count / trackList[i].totalExp)
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

export default TrackProgress;