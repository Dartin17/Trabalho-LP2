import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useState } from "react";
import TelaCadastroCliente from "./components/Telas/TelaCadastroCliente";
import TelaCadastroFornecedor from "./components/Telas/TelaCadastroFornecedor";
import TelaCadastroUsuario from "./components/Telas/TelaCadastroUsuario";
import TelaCadastroProduto from "./components/Telas/TelaCadastroProduto";
import TelaCadastroCategoria from "./components/Telas/TelaCadastroCategoria";
import TelaMenu from "./components/Telas/TelaMenu";
import Tela404 from "./components/Telas/Tela404";
import TelaLogin from "./components/Telas/TelaLogin";

export const ContextoUsuario = createContext();

function App() {
    const [usuario, setUsuario] = useState({
        nome: "",
        perfil: "",
        logado: false,
    });

    return (
        <div className="App">
            <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
                <BrowserRouter>
                    <Routes>
                        {!usuario.logado ? (
                            <Route path="/" element={<TelaLogin />} />
                        ) : (
                            <>
                                {/* Rota inicial, redireciona para o menu se o usuário estiver logado */}
                                <Route path="/" element={<TelaMenu />} />
                                <Route path="/produto" element={<TelaCadastroProduto />} />
                                <Route path="/cliente" element={<TelaCadastroCliente />} />
                                <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
                                <Route path="/usuario" element={<TelaCadastroUsuario />} />
                                <Route path="/categoria" element={<TelaCadastroCategoria />} />
                            </>
                        )}

                        <Route path="*" element={<Tela404 />} />
                    </Routes>
                </BrowserRouter>
            </ContextoUsuario.Provider>
        </div>
    );
}

export default App;
