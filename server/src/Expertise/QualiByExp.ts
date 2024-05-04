import express from "express";
import DB from "../ConnectionDB/db";

function ListarQualificadoresPorExpParceiro(): express.Router {

    const router = express.Router();

    const resultado = new Array;

    router.get('/Qualificadores/:especializacao_id/:parceiro_id', async (req, res) => {
        try {
          const { especializacao_id , parceiro_id } = req.params;
          const resultado = new Array;
      
          const todosQ = await DB.query(`SELECT * FROM Qualificadores WHERE id_especializacao = '${especializacao_id}' ;`);

          const qConcluidos = await DB.query(`SELECT * FROM ParceiroQualificador WHERE id_parceiro = '${parceiro_id}' ;`)

          for(let i =0; i< Number(todosQ.rowCount) ; i++){
            resultado.push({id: todosQ.rows[i].qualificador_id, titulo: todosQ.rows[i].qualificador_titulo, descricao: todosQ.rows[i].qualificador_descricao, concluido: false})
          }
          
          for(let i =0; i< Number(resultado.length) ; i++){
            for(let j = 0; j < Number((qConcluidos.rowCount)); j++ ){
              if(resultado[i].id == qConcluidos.rows[j].id_qualificador){
                resultado[i].concluido = true
              }
            }
        }
        
      
        if (todosQ.rows.length === 0) {
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

export default ListarQualificadoresPorExpParceiro;