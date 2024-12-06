import { Router } from "express";
import ControleCliente from "../controle/controleCliente.js";

const clienteCtrl = new ControleCliente();
const rota = Router();

rota.get("/",clienteCtrl.consultar)
.get("/:cpf", clienteCtrl.consultar)
.post("/", clienteCtrl.gravar)
.put("/", clienteCtrl.atualizar)
.patch("/", clienteCtrl.atualizar)
.delete("/", clienteCtrl.excluir);

export default rota;