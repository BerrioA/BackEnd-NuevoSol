import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

// Modelo de Roles
export const Role = sequelize.define("roles", {
  rid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rolename: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    validate: {
      isIn: {
        args: [["ADMIN", "REPRESENTATIVE", "CLIENT", "ASISTANT"]],
        msg: "Role must be one of ADMIN, REPRESENTATIVE, CLIENT, or ASISTANT",
      },
    },
  },
});

// Hook para insertar roles automáticamente después de sincronizar el modelo
Role.afterSync(async () => {
  const roles = ["ADMIN", "REPRESENTATIVE", "CLIENT", "ASISTANT"];
  for (const rolename of roles) {
    await Role.findOrCreate({
      where: { rolename },
    });
  }
});

