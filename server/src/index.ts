import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import CadastroDeParceiros from './User/PostUser';
import ListarParceiroID from './User/GetUser';
import EdicaoDeParceiros from './User/PutUser';
import CadastroDeAdmin from './Admin/PostAdmin';
import ListarTodosUsuarios from './Admin/GetAdmin';
import Login from './Authentication/Login';
import CadastroDeParceirosAdmin from './Admin/PostAdmin';
import DeleteUser from './User/DeleteUser';




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





// CRUD - USER

// Cadastro de Parceiros - 
app.use('/PostUser', CadastroDeParceiros());

// Listagem De Parceiro por ID
app.use('/GetUser', ListarParceiroID());

// Edição de Parceiro por ID
app.use('/PutUser', EdicaoDeParceiros());

// Delete de Parceiro por ID
app.use('/DeleteUser', DeleteUser());





// CRUD - ADMIN

//Cadastro de Admin
app.use('/PostAdmin', CadastroDeAdmin())

//Listagem dos Parceiros
app.use('/GetAdmin', ListarTodosUsuarios())

//Cadastro de Parceiros pelo Admin
app.use('/PostAdmin', CadastroDeParceirosAdmin())