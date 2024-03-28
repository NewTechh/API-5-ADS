import * as express from "express";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));