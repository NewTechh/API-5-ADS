import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import CadastroDeParceiros from './User/PostUser';
import ListarParceiroID from './User/GetUser';
import EdicaoDeParceiros from './User/PutUser';
import CadastroDeAdmin from './Admin/PostAdmin';
import ListarTodosUsuarios from './Admin/GetAdmin';
import Login from './Authentication/Login';
import GetTrack from './Expertise/GetTrack';
import ListarExpertiseByTrackID from './Expertise/ExpByTrack';
import TrackProgress from './Expertise/TrackProgress';
import LinkPartner from './Expertise/LinkPartner';
import CadastroConsultor from './Consultor/PostConsultor';
import { ListarConsultorID, ListarTodosConsultores } from './Consultor/GetConsultor';
import {ExclusaoLogicaConsultor, ReativacaoConsultor } from './Consultor/DeleteConsultor';
import EdicaoDeConsultores from './Consultor/PutConsultor';
import { EnviarToken, ValidarToken} from './Authentication/RecPassword';
import EmailPorID from './Authentication/RecIDbyEmail';
import UpdatePassword from './Authentication/ChangePassword';




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



// AUTHENTICATION

app.use('/Auth', Login());
app.use('/Auth', EnviarToken());
app.use('/Auth', ValidarToken());
app.use('/Auth', EmailPorID());
app.use('/Auth', UpdatePassword());





// CRUD - USER

app.use('/PostUser', CadastroDeParceiros());
app.use('/GetUser', ListarParceiroID());
app.use('/PutUser', EdicaoDeParceiros())


//CRUD - Consultor

//Cadastro
app.use('/PostConsultor', CadastroConsultor())

//Listar apenas os dados do usuário logado
app.use('/GetConsultor', ListarConsultorID())

//Listar todos os dados de todos os consultores
app.use('/GetConsultor', ListarTodosConsultores())

//Edição Consultor
app.use('/PutConsultor', EdicaoDeConsultores())

//Exclusão Lógica
app.use('/PutConsultor', ExclusaoLogicaConsultor())
app.use('/PutConsultor', ReativacaoConsultor())


// CRUD - ADMIN

app.use('/PostAdmin', CadastroDeAdmin())
app.use('/GetAdmin', ListarTodosUsuarios())


// Trilhas de especialização
app.use('/Tracks', GetTrack())
app.use('/Tracks', ListarExpertiseByTrackID())
app.use('/Tracks', TrackProgress())
app.use('/Tracks', LinkPartner())