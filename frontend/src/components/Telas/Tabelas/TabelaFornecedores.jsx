import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { deletarFornecedor, zerarMensagem } from "../../../redux/reduxFornecedor";
import ESTADO from "../../../redux/reduxEstado";
import { ContextoUsuario } from "../../../App";

export default function TabelaFornecedores(props) {
    const { usuario } = useContext(ContextoUsuario);
    let { estado, mensagem, listaFornecedores } = useSelector((state) => state.fornecedores);
    const dispatch = useDispatch();

    useEffect(() => {
        if ((estado === ESTADO.OCIOSO || estado === ESTADO.ERRO) && mensagem) {
            window.alert(mensagem);
            dispatch(zerarMensagem());
        }
    }, [estado, mensagem, dispatch]);

    function atualizar(fornecedor) {
        if (window.confirm("Deseja realmente alterar o Fornecedor -> " + fornecedor.cnpj)) {
            props.setFornecedorSelecionado(fornecedor);
            props.setModoEdicao(true);
            props.setExibirFornecedores(false);
        }
    }

    function deletar(fornecedor) {
        if (window.confirm("Deseja realmente excluir o Fornecedor -> " + fornecedor.cnpj)) {
            dispatch(deletarFornecedor(fornecedor));
        }
    }

    return (
        <>
            {
                estado === ESTADO.PENDENTE ? (
                    <Alert variant="primary" className="d-flex align-items-center gap-3">
                        <Spinner animation="border" role="status"></Spinner>
                        {mensagem}
                    </Alert>
                ) : (
                    <>
                        {usuario.logado && usuario.perfil !== 'Normal' &&
                            <Button
                                className="mb-3"
                                variant="primary"
                                onClick={() => {
                                    props.setExibirFornecedores(false);
                                }}
                            >
                                Adicionar
                            </Button>
                        }
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CNPJ</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Endereço</th>
                                    {
                                        usuario.logado && usuario.perfil !== 'Normal' &&
                                        <th>Ações</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {listaFornecedores?.map((fornecedor) => {
                                    return (
                                        <tr key={fornecedor.cnpj}>
                                            <td>{fornecedor.nome}</td>
                                            <td>{fornecedor.cnpj}</td>
                                            <td>{fornecedor.email}</td>
                                            <td>{fornecedor.telefone}</td>
                                            <td>{fornecedor.endereco}</td>
                                            {usuario.logado && usuario.perfil !== 'Normal' &&
                                                <td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                                                    <Button onClick={() => { atualizar(fornecedor); }} variant="warning" style={{ marginRight: '1em' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </Button>
                                                    <Button onClick={() => { deletar(fornecedor); }} variant="danger">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </Button>
                                                </td>
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <p>Quantidade de Fornecedores cadastrados: {listaFornecedores?.length}</p>
                    </>
                )
            }
        </>
    );
}