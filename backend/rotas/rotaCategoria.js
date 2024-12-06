import { Router } from 'express';
import ControleCategoria from '../controle/controleCategoria.js';

const categoriaCtrl = new ControleCategoria();
const rota = Router();

rota
.get("/", categoriaCtrl.consultar)
.get("/:codigo", categoriaCtrl.consultar)
.post("/", categoriaCtrl.gravar)
.put("/:codigo", categoriaCtrl.atualizar)
.patch("/:codigo", categoriaCtrl.atualizar)
.delete("/:codigo", categoriaCtrl.deletar);

export default rota;