import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./Users.js";
import { Tour } from "./Tours.js";

// Modelo de Inscripciones
export const Inscription = sequelize.define("inscriptions", {
  iid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  numberAdults: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numberChildren: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "uid",
    },
  },
  toursId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tour,
      key: "tid",
    },
  },
  representativeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "uid",
    },
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  representativeCommission: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  inscriptionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

