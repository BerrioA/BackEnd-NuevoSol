import { User } from "../models/Users.js";
import argon2 from "argon2";

//Función encargada de mostrar solo un usuario por id
export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({
      where: {
        uid,
      },
    });

    if (!user) return res.status(409).json({ error: "Usuario no encontrado" });

    return res.json({ msg: user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Error al intentar optener los usuarios." });
  }
};

//Función encargada de mostrar tosos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json({ msg: users });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Error al intentar optener los usuarios." });
  }
};

//Función encargada de registrar los usuario
export const registerUser = async (req, res) => {
  try {
    const {
      imageProfile,
      userName,
      lastName,
      idNumber,
      cellphone,
      cellphoneContact,
      email,
      password,
    } = req.body;

    const hashPassword = await argon2.hash(password);

    const newUser = await User.create({
      imageProfile,
      userName,
      lastName,
      idNumber,
      cellphone,
      cellphoneContact,
      email,
      password: hashPassword,
    });

    return res
      .status(201)
      .json({ msg: "Usuario registrado con exito.", newUser });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Error al intentar registar el usuario." });
  }
};

//Función encargada de actualizar un usuario
export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const {
      imageProfile,
      userName,
      lastName,
      idNumber,
      cellphone,
      cellphoneContact,
      email,
    } = req.body;

    const user = await User.findByPk(uid);
    if (!user) return res.status(409).json({ error: "Usuario no encontrado" });

    if (imageProfile !== undefined) user.imageProfile = imageProfile;
    if (userName !== undefined) user.userName = userName;
    if (lastName !== undefined) user.lastName = lastName;
    if (idNumber !== undefined) user.idNumber = idNumber;
    if (cellphone !== undefined) user.cellphone = cellphone;
    if (cellphoneContact !== undefined)
      user.cellphoneContact = cellphoneContact;
    if (email !== undefined) user.email = email;

    await user.save();

    return res.json({ msg: "Usuario actualizado con exito", user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Error al intentar actualizar los datos del usuario." });
  }
};

//Función encargada de actualizar la contraseña de un usuario
export const updatePassword = async (req, res) => {
  try {
    const { uid } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(uid);
    if (!user) return res.status(409).json({ error: "Usuario no encontrado" });

    const isMatch = await argon2.verify(user.password, oldPassword);
    if (!isMatch)
      return res.status(401).json({ error: "Contraseña actual incorrecta." });

    const hashPassword = await argon2.hash(newPassword);
    user.password = hashPassword;

    await user.save();

    return res.json({ msg: "Contraseña actualizada con exito." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Error al intentar actualizar la contraseña." });
  }
};

//Función encargada de eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findByPk(uid);
    if (!user) return res.status(409).json({ error: "Usuario no encontrado" });

    await User.destroy({
      where: {
        uid,
      },
    });

    return res.status(200).json({ msg: "Usuario eliminado con exito." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Error al intentar eliminar el usuario." });
  }
};
