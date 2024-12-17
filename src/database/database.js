import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("nuevo_sol", "postgres", "Danda1214", {
  host: "localhost",
  dialect: "postgres",
});
