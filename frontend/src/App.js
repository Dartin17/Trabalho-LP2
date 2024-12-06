import TelaCadastroCliente from "./components/Telas/TelaCadastroCliente";
import TelaCadastroFornecedor from "./components/Telas/TelaCadastroFornecedor";
import TelaCadastroUsuario from "./components/Telas/TelaCadastroUsuario";
import TelaCadastroProduto from "./components/Telas/TelaCadastroProduto";
import TelaCadastroCategoria from "./components/Telas/TelaCadastroCategoria";
import TelaMenu from "./components/Telas/TelaMenu";
import Tela404 from "./components/Telas/Tela404";
import TelaLogin from "./components/Telas/TelaLogin"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";

export const ContextoUsuario = createContext();

function App() {
    const [carregando, setCarregando] = useState(true);
    const [usuario, setUsuario] = useState({
        nome: "",
        perfil: "",
        logado: false,
    });

    return (
        <div className="App">
            <ContextoUsuario.Provider value = {{ usuario, setUsuario }}>
                <BrowserRouter>
                    <Routes>
                        {
                            !carregando ? (
                                <>
                                    {!usuario.logado ? (
                                        <Route path="/" element={<TelaLogin />} />
                                    ) : (
                                        <>
                                            <Route path="/" element={<TelaMenu />} />
                                            <Route path="/produto" element={<TelaCadastroProduto />} />
                                            <Route path="/cliente" element={<TelaCadastroCliente />} />
                                            <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
                                            <Route path="/usuario" element={<TelaCadastroUsuario />} />
                                            <Route path="/categoria" element={<TelaCadastroCategoria />} />
                                        </>
                                    )}
                                    <Route path="*" element={<Tela404 />}/>
                                </>
                            ) : (
                                null
                            )

                        }
                    </Routes>
                </BrowserRouter>
            </ContextoUsuario.Provider>
        </div>
    );
}
export default App;