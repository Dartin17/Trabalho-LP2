import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'

import store from './redux/reduxStore'
import { Provider, useDispatch } from 'react-redux';
import { consultarCategorias } from './redux/reduxCategoria';
import { consultarClientes } from './redux/reduxCliente';
import { consultarFornecedores } from './redux/reduxFornecedor';
import { consultarProdutos } from './redux/reduxProduto';
import { consultarUsuarios } from './redux/reduxUsuario';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Get = () => {
  try {
    const dispatch = useDispatch();
    dispatch(consultarCategorias());
    dispatch(consultarClientes());
    dispatch(consultarFornecedores());
    dispatch(consultarProdutos());
    dispatch(consultarUsuarios());
  } catch(erro) {
    window.alert(erro.mensagem)
  }
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Get />
      <App />
    </Provider>
  </React.StrictMode>
);
