import { DataTypes } from "sequelize";
import banco from "../banco.js";

const Reserva = banco.define("reserva", {
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkout: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tipoQuartoId: {
  type: DataTypes.INTEGER,
  allowNull: false,
  },
  valor_total: {
  type: DataTypes.FLOAT,
  allowNull: true,
}

});

export default Reserva;