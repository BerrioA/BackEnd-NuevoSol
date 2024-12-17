import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Inscription } from "./Inscriptions.js";

// Modelo de Pagos
export const Payment = sequelize.define("payments", {
  pid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  inscriptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Inscription,
      key: "iid",
    },
  },
  amountPaid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

