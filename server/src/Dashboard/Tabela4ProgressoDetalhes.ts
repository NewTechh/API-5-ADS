import express from "express";
import DB from "../ConnectionDB/db";

function Tabela4ProgressoDetalhes(): express.Router {

    const router = express.Router();

    router.get('/Detalhes/:id_parceiro', async (req, res) => {
        try {
          const { id_parceiro } = req.params;   
          
          const resultado = new Array;

          function formatarData(data: string){
            let dt = new Date(data);
            let dateOnly = dt.toISOString().split('T')[0];
            return dateOnly;
          }

          //nome da trilha, id da trilha e data de aquisição
          const trilhasdoparceiro = await DB.query(`SELECT trilha_nome, trilha_id, pt_data FROM ParceiroTrilha pt
                                                    JOIN Trilhas t
                                                    ON t.trilha_id = pt.id_trilha
                                                    WHERE pt.id_parceiro = '${id_parceiro}'`);
          
          for(let i = 0 ; i< Number(trilhasdoparceiro.rowCount); i++){
            resultado.push({trilha_nome: trilhasdoparceiro.rows[i].trilha_nome , 
                trilha_id: trilhasdoparceiro.rows[i].trilha_id, 
                data_aquisicao: formatarData(trilhasdoparceiro.rows[i].pt_data),
                data_inicio: '',
                ultima_atividade: '',
                exp_total: 0,
                exp_concluidas: 0,
                status: ''})
          };
          //data do primeiro requisito completado
          const datainicio = await DB.query(`SELECT MIN(pq_data), e.id_trilha FROM ParceiroQualificador pq
                                            JOIN Qualificadores q 
                                            ON q.qualificador_id = pq.id_qualificador
                                            JOIN Especializacoes e
                                            ON e.especializacao_id = q.id_especializacao
                                            WHERE id_parceiro = '${id_parceiro}'
                                            GROUP BY(e.id_trilha);`);

          for(let i = 0; i< Number(resultado.length); i++){
            for(let j = 0; j< Number(datainicio.rowCount); j++){
                if(resultado[i].trilha_id == datainicio.rows[j].id_trilha){
                    resultado[i].data_inicio = formatarData(datainicio.rows[j].min)
                }
            }
          }
          //data do último requisito completado
          const ultimaatv = await DB.query(`SELECT MAX(pq_data), e.id_trilha FROM ParceiroQualificador pq
                                            JOIN Qualificadores q 
                                            ON q.qualificador_id = pq.id_qualificador
                                            JOIN Especializacoes e
                                            ON e.especializacao_id = q.id_especializacao
                                            WHERE id_parceiro = '${id_parceiro}'
                                            GROUP BY(e.id_trilha);`);

          for(let i = 0; i< Number(resultado.length); i++){
            for(let j = 0; j< Number(ultimaatv.rowCount); j++){
                if(resultado[i].trilha_id == ultimaatv.rows[j].id_trilha){
                    resultado[i].ultima_atividade = formatarData(ultimaatv.rows[j].max)
                }
            }
          }
          //total de expertises da trilha
          const exptotal = await DB.query(`SELECT COUNT(especializacao_id), id_trilha FROM Especializacoes GROUP BY(id_trilha);`);
          for(let i = 0; i < Number(resultado.length); i++){
            for(let j =0; j<Number(exptotal.rowCount); j++){
                if(resultado[i].trilha_id == exptotal.rows[j].id_trilha){
                    resultado[i].exp_total = Number(exptotal.rows[j].count) ;
                }
            }
          }

          //quantidade de requisitos atigidos pelo parceiro separadas por expertise
          const qualiexpparc = await DB.query(`SELECT COUNT(id_qualificador), q.id_especializacao FROM ParceiroQualificador pq
                                            JOIN Qualificadores q ON q.qualificador_id = pq.id_qualificador
                                            WHERE pq.id_parceiro = '${id_parceiro}'
                                            GROUP BY(q.id_especializacao);`);
          //quantidade de requisitos total de cada expertise
          const qualiexptotal = await DB.query(`SELECT COUNT(q.qualificador_id), q.id_especializacao, e.id_trilha 
                                            FROM Qualificadores q
                                            JOIN Especializacoes e
                                            ON e.especializacao_id = q.id_especializacao
                                            GROUP BY(id_especializacao, id_trilha);`);

          for(let i = 0; i< Number(resultado.length); i++){
            for(let j =0 ; j <Number(qualiexptotal.rowCount); j++){
                if(qualiexptotal.rows[j].id_trilha == resultado[i].trilha_id){
                    for(let k = 0 ; k<Number(qualiexpparc.rowCount); k++){
                        if(qualiexpparc.rows[k].id_especializacao == qualiexptotal.rows[j].id_especializacao && qualiexpparc.rows[k].count == qualiexptotal.rows[j].count ){
                            resultado[i].exp_concluidas += 1 ;
                        }
                    }
                }
            }
          }

          //verificar as trilhas q o parceiro iniciou
          const iniciou = await DB.query(`SELECT pq.id_qualificador, e.id_trilha FROM ParceiroQualificador pq
                                            JOIN Qualificadores q 
                                            ON q.qualificador_id = pq.id_qualificador
                                            JOIN Especializacoes e
                                            ON e.especializacao_id = q.id_especializacao
                                            WHERE pq.id_parceiro = '${id_parceiro}'`);

          if(Number(iniciou.rowCount) > 0){
            for(let i = 0; i<Number(resultado.length); i++){
                for(let j= 0; j< Number(iniciou.rowCount); j++){
                    if(resultado[i].trilha_id == iniciou.rows[j].id_trilha && resultado[i].exp_concluidas == resultado[i].exp_total){
                        resultado[i].status = 'Concluída'
                    }else{
                        resultado[i].status = 'Em andamento'
                    }
                }
            }
          }else{
            for(let i =0 ; i< Number(resultado.length); i++){
                resultado[i].status = 'Não iniciada'
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

export default Tabela4ProgressoDetalhes;