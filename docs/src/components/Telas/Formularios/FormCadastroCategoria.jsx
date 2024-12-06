import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { atualizarCategoria, gravarCategoria, zerarMensagem } from "../../../redux/reduxCategoria";
import ESTADO from "../../../redux/reduxEstado";

export default function FormCadastroCategoria(props) {
	const dispatch = useDispatch();
	let { estado, mensagem } = useSelector((state) => state.categorias);

	const [formValidado, setFormValidado] = useState(false);
	const [categoriaReseta] = useState({
		codigo: "",
		descricao: ""
	});

	useEffect(() => {
		if (estado === ESTADO.OCIOSO && mensagem) {
			window.alert(mensagem);
			dispatch(zerarMensagem());
			props.setCategoriaSelecionado(categoriaReseta);
			props.setModoEdicao(false);
			props.setExibirCategorias(true);
		}
		else if (estado === ESTADO.ERRO && mensagem) {
			window.alert(mensagem);
			dispatch(zerarMensagem());
		}

	}, [estado, mensagem, props, categoriaReseta, dispatch]);

	function manipularSubmissao(evento) {
		const form = evento.currentTarget;
		if (form.checkValidity()) {
			setFormValidado(false);
			if (!props.modoEdicao)
				dispatch(gravarCategoria(props.categoriaSelecionado));
			else
				dispatch(atualizarCategoria(props.categoriaSelecionado, dispatch));
		}
		else
			setFormValidado(true);
		evento.preventDefault();
		evento.stopPropagation();
	}

	function manipularMudanca(evento) {
		const elemento = evento.target.name;
		const valor = evento.target.value;
		props.setCategoriaSelecionado({
			...props.categoriaSelecionado,
			[elemento]: valor,
		});
	}

	return (
		<Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
			{/* ########## Codigo ########## */}
			<Form.Group className="mb-3" style={{ display: !props.modoEdicao ? "none" : "block" }}>
				<Form.Label>Código</Form.Label>
				<Form.Control
					disabled={props.modoEdicao}
					id="codigo"
					name="codigo"
					value={props.categoriaSelecionado.codigo}
					type="text"
					placeholder="Código"
				/>
			</Form.Group>
			{/* ########## Descricao ########## */}
			<Form.Group className="mb-3">
				<Form.Label>Descrição</Form.Label>
				<Form.Control
					required
					id="descricao"
					name="descricao"
					value={props.categoriaSelecionado.descricao}
					onChange={manipularMudanca}
					type="text"
					placeholder="Descrição"
				/>
				<Form.Control.Feedback type="invalid">
					Por favor, informe a descrição.
				</Form.Control.Feedback>
			</Form.Group>
			<Row className="mt-2 mb-2">
				<Col md={2}>
					<Button type="submit" variant={props.modoEdicao ? "warning" : "success"}>
						{props.modoEdicao ? "Alterar" : "Confirmar"}
					</Button>
				</Col>
				<Col>
					<Button
						onClick={() => {
							props.setCategoriaSelecionado(categoriaReseta);
							props.setModoEdicao(false);
							props.setExibirCategorias(true);
						}}
						type="button"
						variant={props.modoEdicao ? "warning" : "success"}
					>
						Voltar
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
