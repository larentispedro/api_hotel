import { DataTypes } from "sequelize";
import banco from "../banco.js";

const TipoQuarto = banco.define("tipo_quarto", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default TipoQuarto;