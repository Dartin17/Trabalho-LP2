import { Router } from 'express';
import ControleProduto from "../controle/controleProduto.js";

const produtoCtrl = new ControleProduto();
const rota = Router();

rota
.get("/", produtoCtrl.consultar)
.get("/:codigo", produtoCtrl.consultar)
.post("/", produtoCtrl.gravar)
.put("/:codigo", produtoCtrl.atualizar)
.patch("/:codigo", produtoCtrl.atualizar)
.delete("/:codigo", produtoCtrl.deletar);

export default rota;