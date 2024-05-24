import express from "express";
import DB from "../ConnectionDB/db";

function Grafico1ParceirosCadastrados(): express.Router {

    const router = express.Router();

    router.get('/Grafico1ParceirosCadastrados', async (req, res) => {
        try {
          
          const resultado = {nao_iniciado: 0, em_andamento: 0, concluido: 0, total: 0};

          const parczero = await DB.query(`SELECT COUNT(id_parceiro) FROM ParceiroTrilha 
                                        WHERE id_parceiro NOT IN (SELECT id_parceiro FROM ParceiroQualificador); `);

          const qtrilha = await DB.query(`SELECT COUNT(qualificador_id) AS qtrilha, id_trilha
                                        FROM Qualificadores q
                                        JOIN Especializacoes e
                                        ON e.especializacao_id = q.id_especializacao
                                        GROUP BY(e.id_trilha) ;`);

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

          resultado.nao_iniciado = Number(parczero.rows[0].count);  
          
          for(let i = 0; i< Number(qparc.rowCount) ; i++){
            for(let j = 0; j< Number(qtrilha.rowCount); j++){
                if(qparc.rows[i].trilha_id == qtrilha.rows[j].id_trilha && qparc.rows[i].qparc == qtrilha.rows[j].qtrilha ){
                    resultado.concluido += 1;
                }
                else if(qparc.rows[i].trilha_id == qtrilha.rows[j].id_trilha && qparc.rows[i].qparc != qtrilha.rows[j].qtrilha){
                    resultado.em_andamento += 1;
                }
            }
          }

          
          resultado.total = resultado.nao_iniciado + resultado.em_andamento + resultado.concluido ;

          if (resultado.total == 0) {
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

export default Grafico1ParceirosCadastrados;