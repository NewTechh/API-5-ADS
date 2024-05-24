import express from "express";
import DB from "../ConnectionDB/db";

function Tabela3ProgressoParceiros(): express.Router {

    const router = express.Router();

    router.get('/Tabela3ProgressoParceiros', async (req, res) => {
        try {
          
          const resultado = new Array;

          const geral = await DB.query(`SELECT parceiro_nome, id_parceiro, trilha_nome, id_trilha
                                        FROM ParceiroTrilha pt
                                        JOIN Parceiros p
                                        ON p.parceiro_id = pt.id_parceiro
                                        JOIN Trilhas t
                                        ON t.trilha_id = pt.id_trilha ;`);

          const qparceiro = await DB.query(`SELECT COUNT(id_qualificador), id_parceiro, id_trilha
                                            FROM ParceiroQualificador pq
                                            JOIN Qualificadores q 
                                            ON q.qualificador_id = pq.id_qualificador
                                            JOIN Especializacoes e
                                            ON e.especializacao_id = q.id_especializacao
                                            JOIN Trilhas t
                                            ON t.trilha_id = e.id_trilha
                                            JOIN Parceiros p 
                                            ON p.parceiro_id = pq.id_parceiro
                                            GROUP BY(id_parceiro, id_trilha);`);
          
          const qtrilha = await DB.query(`SELECT COUNT(qualificador_id), id_trilha
                                        FROM Qualificadores q
                                        JOIN Especializacoes e
                                        ON e.especializacao_id = q.id_especializacao
                                        GROUP BY(e.id_trilha) ;`);

                                        
          for(let i =0; i< Number(geral.rowCount) ; i++){
            resultado.push({parceiro_nome: geral.rows[i].parceiro_nome, trilha_nome: geral.rows[i].trilha_nome, trilha_id: geral.rows[i].id_trilha, parceiro_id: geral.rows[i].id_parceiro, progresso: 0 })
          }

          for(let i = 0; i < Number(resultado.length) ; i++){
            for(let j = 0; j < Number(qparceiro.rowCount); j++){
              if(resultado[i].trilha_id == qparceiro.rows[j].id_trilha && resultado[i].parceiro_id == qparceiro.rows[j].id_parceiro){
                resultado[i].progresso = Number(qparceiro.rows[j].count);
              }
            }
          }
          
          for(let i = 0; i < Number(resultado.length) ; i++){
            for(let j = 0 ; j < Number(qtrilha.rowCount) ; j++){
              if(resultado[i].progresso != 0 && resultado[i].trilha_id == qtrilha.rows[j].id_trilha){
                resultado[i].progresso = resultado[i].progresso / Number(qtrilha.rows[j].count);
              }
            }
          }

          
          if (resultado.length === 0) {
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

export default Tabela3ProgressoParceiros;