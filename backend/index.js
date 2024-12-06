import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaCategoria from './rotas/rotaCategoria.js';
import rotaCliente from './rotas/rotaCliente.js';
import rotaFornecedor from './rotas/rotaFornecedor.js';
import rotaProduto from './rotas/rotaProduto.js';
import rotaUsuario from './rotas/rotaUsuario.js';

dotenv.config();

const host = "0.0.0.0";
const porta = 5000;
const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*"
}));

// Aplicando o middleware nas rotas protegidas
app.use('/categorias', rotaCategoria);
app.use('/clientes', rotaCliente);
app.use('/fornecedores', rotaFornecedor);
app.use('/produtos', rotaProduto);
app.use('/usuarios', rotaUsuario);

// Rota livre
app.use('/', (req, res) => {
    res.send("Servidor Escutando !!!");
});
    
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
