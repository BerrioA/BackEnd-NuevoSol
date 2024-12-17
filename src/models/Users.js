import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Role } from "./Roles.js";

// Modelo de Usuarios
export const User = sequelize.define("users", {
  uid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imageProfile: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  userName: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  idNumber: {
    type: DataTypes.STRING(12),
    allowNull: false,
    unique: true,
  },
  cellphone: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  cellphoneContact: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
    references: {
      model: Role,
      key: "rid",
    },
  },
});
