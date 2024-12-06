import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useContext, useRef, useState } from "react";
import { ContextoUsuario } from "../../App";
import { login } from "../../services/servicoUsuario";

export default function Usuario(props) {
    const nome = useRef();
    const senha = useRef();
    const { setUsuario } = useContext(ContextoUsuario);
    const [carregando, setCarregando] = useState(false);
    const [formValidado, setFormValidado] = useState(false);

    function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            setCarregando(true);

            const nomeDig = nome.current.value;
            const senhaDig = senha.current.value;

            login(nomeDig, senhaDig)
                .then((resposta) => {
                    if (resposta?.status) {
                        // Assumindo que o backend retorna as informações do usuário
                        const { nome, perfil } = resposta.usuario;

                        // Armazena no localStorage ou apenas no estado
                        localStorage.setItem("usuario", JSON.stringify({ nome, perfil, logado: true }));
                        setUsuario({
                            nome,
                            perfil,
                            logado: true
                        });

                        window.alert("Logado com Sucesso!");
                    } else {
                        window.alert(resposta.mensagem);
                    }
                    setCarregando(false);
                })
                .catch((erro) => {
                    setCarregando(false);
                    window.alert("Erro: " + (erro.mensagem || "Não foi possível realizar o login."));
                });
        } else {
            setFormValidado(true);
        }
    }

    return (
        <Container>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao} className="p-5 mt-5 mx-auto rounded bg-body-tertiary" style={{ width: "50vw" }}>
                <h3 className="mb-4 text-center">Login</h3>
                <Form.Group className="mt-4 mb-3">
                    <Form.Label>Nome de usuário</Form.Label>
                    <Form.Control
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Informe o nome de usuário"
                        ref={nome}
                        required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        id="senha"
                        name="senha"
                        type="password"
                        placeholder="Informe a sua senha"
                        ref={senha}
                        required />
                    <Form.Control.Feedback type="invalid" className="mt-3">
                        Usuario ou senha incorretos!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button disabled={carregando} type="submit" variant="primary" className="text-center mb-2">
                    {carregando ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Carregando...
                        </>
                    ) : (
                        "Entrar"
                    )}
                </Button>
            </Form>
        </Container>
    );
}
