import { configureStore } from "@reduxjs/toolkit";
import reduxProduto from "./reduxProduto";
import reduxCategoria from "./reduxCategoria";
import reduxCliente from './reduxCliente';
import reduxFornecedor from "./reduxFornecedor";
import reduxUsuarios from "./reduxUsuario";

// Configuração da Store
const store = configureStore({
    reducer: {
        categorias: reduxCategoria,
        clientes: reduxCliente,
        fornecedores: reduxFornecedor,
        usuarios: reduxUsuarios,
        produtos: reduxProduto
    }
});

export default store;
