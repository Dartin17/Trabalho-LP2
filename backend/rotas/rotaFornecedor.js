import { Router } from "express";
import ControleFornecedor from "../controle/controleFornecedor.js";

const fornecedorCtrl = new ControleFornecedor();
const rota = Router();

rota.get("/",fornecedorCtrl.consultar)
.get("/:cnpj", fornecedorCtrl.consultar)
.post("/", fornecedorCtrl.gravar)
.put("/", fornecedorCtrl.atualizar)
.patch("/", fornecedorCtrl.atualizar)
.delete("/", fornecedorCtrl.excluir);

export default rota;