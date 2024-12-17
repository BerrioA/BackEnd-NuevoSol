import { sequelize } from "../database/database.js";
import { Role } from "../models/Roles.js";
import { User } from "../models/Users.js";
import { Tour } from "../models/Tours.js";
import { Inscription } from "../models/Inscriptions.js";
import { Payment } from "../models/Payments.js";

// Definir relaciones
// Relación: Un usuario tiene un rol
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId" });

// Relación: Un usuario puede inscribirse a tours (como cliente)
Inscription.belongsTo(User, { foreignKey: "clientId", as: "client" });
User.hasMany(Inscription, { foreignKey: "clientId", as: "clientInscriptions" });

// Relación: Un usuario puede ser representante en inscripciones
Inscription.belongsTo(User, {
  foreignKey: "representativeId",
  as: "representative",
});
User.hasMany(Inscription, {
  foreignKey: "representativeId",
  as: "representativeInscriptions",
});

// Relación: Una inscripción está asociada a un tour
Inscription.belongsTo(Tour, { foreignKey: "toursId", as: "tour" });
Tour.hasMany(Inscription, { foreignKey: "toursId", as: "inscriptions" });

// Relación: Un pago pertenece a una inscripción
Payment.belongsTo(Inscription, {
  foreignKey: "inscriptionId",
  as: "inscription",
});
Inscription.hasMany(Payment, { foreignKey: "inscriptionId", as: "payments" });

// Exportar todos los modelos
export { sequelize, Role, User, Tour, Inscription, Payment };
