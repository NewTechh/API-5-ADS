import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import CadastroDeParceiros from './User/PostUser';
import { ListarTodosParceiros, ListarParceiroID, ListarTodosParceirosComTrilhas } from './User/GetUser';
import EdicaoDeParceiros from './User/PutUser';
import CadastroDeAdmin from './Admin/PostAdmin';
import { ListarAdminID, ListarTodosAdministradores } from './Admin/GetAdmin';
import Login from './Authentication/Login';
import GetTrack from './Expertise/GetTrack';
import ListarExpertiseByTrackID from './Expertise/ExpByTrack';
import TrackProgress from './Expertise/TrackProgress';
import LinkPartner from './Expertise/LinkPartner';
import CadastroConsultor from './Consultor/PostConsultor';
import { ListarConsultorID, ListarTodosConsultores } from './Consultor/GetConsultor';
import {DeleteConsultor, ExclusaoLogicaConsultor, ReativacaoConsultor } from './Consultor/DeleteConsultor';
import EdicaoDeConsultores from './Consultor/PutConsultor';
import { EnviarToken, ValidarToken} from './Authentication/RecPassword';
import EmailPorID from './Authentication/RecIDbyEmail';
import UpdatePassword from './Authentication/ChangePassword';
import ListarParceiroCPF from './User/ConsultaPorCPF';
import {DeleteUser, ExclusaoLogicaParceiro, ReativacaoParceiro } from './User/DeleteUser';
import ListarConsultorCPF from './Consultor/ConsultarPorCPF';
import { ExclusaoLogicaAdmin, ReativacaoAdmin, DeleteAdmin } from './Admin/DeleteAdmin';
import EdicaoDeAdmin from './Admin/PutAdmin';
import UpdatePasswordSelf from './Authentication/ChangeSenhaSelf';
import ListarLog from './RegistroLog/GetLogs';
import EdicaoParceiroLog from './RegistroLog/EdicaoParceiroLog';
import EdicaoConsultorLog from './RegistroLog/EdicaoConsultorLog';
import DeleteConsultorLog from './RegistroLog/DeleteConsultorLog';
import DeleteLogicalConsultorLog from './RegistroLog/DeleteLogicalConsultor';
import DeleteParceiroLog from './RegistroLog/DeleteParceiroLog';
import SignUpLog from './RegistroLog/SignupLog';
import CadastroDeParceirosTrilha from './User/PostUserTrack';
import ListarTracksDoParceiro from './Expertise/PartnerTracks';
import ListarQualificadoresPorExpParceiro from './Expertise/QualiByExp';
import GetExpProgress from './Expertise/GetExpProgress';
import GraficoCountPartnerByTrack from './Dashboard/GraficoCountPartnerByTrack';
import TabelaProgressoParceiros from './Dashboard/TabelaProgressoParceiros';
import CadastroTrilha from "./Track/PostTrack";
import DeletarTrilha from './Track/DeleteTrack';
import EdicaoTrilha from './Track/PutTrack';




//Criação do Servidor Back-End
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log(`Servidor inicializado em http://localhost:${port}/`);
});



// Authentication

app.use('/Auth', Login());

// Recuperação de Senha
app.use('/Auth', EnviarToken());
app.use('/Auth', ValidarToken());
app.use('/Auth', EmailPorID());
app.use('/Auth', UpdatePassword());

//Alteração de Senha
app.use('/Auth', UpdatePasswordSelf())

// Log

app.use('/Log', EdicaoParceiroLog())
app.use('/Log', EdicaoConsultorLog())
app.use('/Log', DeleteConsultorLog())
app.use('/Log', DeleteParceiroLog())
app.use('/Log', SignUpLog())
app.use('/Log', DeleteLogicalConsultorLog())
app.use('/Log', ListarLog())


// CRUD - USER

// Cadastro de Parceiros
app.use('/PostParceiro', CadastroDeParceiros());
app.use('/PostParceiro', CadastroDeParceirosTrilha());

//Listar todos os dados de todos os parceiros.
app.use('/GetParceiro', ListarTodosParceiros())

//Listar dados dos parceiros + trilha adquirida por eles
app.use('/GetParceiro', ListarTodosParceirosComTrilhas())

//Listar apenas os dados do usuário logado
app.use('/GetParceiro', ListarParceiroID());

// Listar os dados do usuário ao clicar na tabela
app.use('/GetParceiro', ListarParceiroCPF());

// Edição Parceiro
app.use('/PutParceiro', EdicaoDeParceiros())

// Exclusão Lógica
app.use('/DeleteParceiro', ExclusaoLogicaParceiro())
app.use('/DeleteParceiro', ReativacaoParceiro())

// Exclusão Definitiva
app.use('/DeleteParceiro', DeleteUser())



//CRUD - Consultor

//Cadastro de Consultor
app.use('/PostConsultor', CadastroConsultor())

//Listar apenas os dados do usuário logado
app.use('/GetConsultor', ListarConsultorID())

// Listar os dados do usuário ao clicar na tabela
app.use('/GetConsultor', ListarConsultorCPF())

//Listar todos os dados de todos os consultores
app.use('/GetConsultor', ListarTodosConsultores())

//Edição Consultor
app.use('/PutConsultor', EdicaoDeConsultores())

//Exclusão Lógica
app.use('/DeleteConsultor', ExclusaoLogicaConsultor())
app.use('/DeleteConsultor', ReativacaoConsultor())

//Exclusão Definitiva
app.use('/DeleteConsultor', DeleteConsultor())



// CRUD - ADMIN

// Cadastro de Admin
app.use('/PostAdmin', CadastroDeAdmin())

//Listar apenas os dados do usuário logado
app.use('/GetAdmin', ListarAdminID())

// Listar todos os dados dos administradores
app.use('/GetAdmin', ListarTodosAdministradores())

//Editar Admin
app.use('/PutAdmin', EdicaoDeAdmin())

//Exclusão Lógica
app.use('/DeleteAdmin', ExclusaoLogicaAdmin())
app.use('/DeleteAdmin', ReativacaoAdmin())

//Exclusão Definitiva
app.use('/DeleteAdmin', DeleteAdmin())


// Trilhas de especialização
//listar trilhas
app.use('/Tracks', GetTrack())

//listar especializacoes da trilha
app.use('/Tracks', ListarExpertiseByTrackID())

//listar trilha(s) vinculada(s) ao parceiro com o progresso
app.use('/Tracks', TrackProgress())

//listar especializacaoes da trilha com progresso do parceiro selecionado
app.use('/Tracks', GetExpProgress())

//vincular parceiro a qualificador
app.use('/Tracks', LinkPartner())

//listar trilha(s) vinculada ao parceiro------------------deletar dps q a TrackProgress for testada
app.use('/Tracks', ListarTracksDoParceiro())

//listar qualificadores de cada especializacao da trilha do parceiro
app.use('/Tracks', ListarQualificadoresPorExpParceiro())


//DASHBOARD
//grafico: quantidade de parceiros em cada trilha
app.use('/Dashboard', GraficoCountPartnerByTrack())
//tabela: todos os parceiros e o progresso em cada trilha q eles estão vinculados
app.use('/Dashboard', TabelaProgressoParceiros())

// CRUD - Trilhas
//listar Trilhas
app.use('/Tracks', GetTrack())
// Cadastro da Trilha
app.use('/PostTrack', CadastroTrilha())
// Exclusão definitiva da trilha
app.use('/DeleteTrack', DeletarTrilha())
// Edição da Trilha
app.use('/PutTrack', EdicaoTrilha())