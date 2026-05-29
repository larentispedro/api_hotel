import express from "express";
import cors from "cors";
import banco from "./banco.js";

import ReservaController from "./controllers/ReservaController.js";
import TipoQuartoController from "./controllers/TipoQuartoController.js";

import TipoQuarto from "./models/TipoQuarto.js";
import Reserva from "./models/Reserva.js";

const app = express();
app.use(cors());
app.use(express.json());


TipoQuarto.hasMany(Reserva, {
  foreignKey: "tipoQuartoId",
});

Reserva.belongsTo(TipoQuarto, {
  foreignKey: "tipoQuartoId",
});


try {
  await banco.authenticate();
  console.log("Conectado ao banco com sucesso");
} catch (erro) {
  console.error("Erro ao conectar no banco:", erro);
}


app.get("/tipo_quarto", TipoQuartoController.listar);
app.get("/tipo_quarto/:id", TipoQuartoController.selecionar);
app.post("/tipo_quarto", TipoQuartoController.inserir);
app.put("/tipo_quarto/:id", TipoQuartoController.alterar);
app.delete("/tipo_quarto/:id", TipoQuartoController.excluir);


app.get("/reserva", ReservaController.listar);
app.get("/reserva/:id", ReservaController.selecionar);
app.post("/reserva", ReservaController.inserir);
app.put("/reserva/:id", ReservaController.alterar);
app.delete("/reserva/:id", ReservaController.excluir);


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});