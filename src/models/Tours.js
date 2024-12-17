import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

// Modelo de Tours
export const Tour = sequelize.define("tours", {
  tid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imageTour: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  nameTour: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  includes: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  routes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});


