import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import CadastroDeParceiros from './User/PostUser';
import { ListarTodosParceiros, ListarParceiroID } from './User/GetUser';
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



// CRUD - USER

// Cadastro de Parceiros
app.use('/PostParceiro', CadastroDeParceiros());

//Listar todos os dados de todos os parceiros.
app.use('/GetParceiro', ListarTodosParceiros())

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

//Exclusão Lógica
app.use('/DeleteAdmin', ExclusaoLogicaAdmin())
app.use('/DeleteAdmin', ReativacaoAdmin())

//Exclusão Definitiva
app.use('/DeleteAdmin', DeleteAdmin())


// Trilhas de especialização
app.use('/Tracks', GetTrack())
app.use('/Tracks', ListarExpertiseByTrackID())
app.use('/Tracks', TrackProgress())
app.use('/Tracks', LinkPartner())