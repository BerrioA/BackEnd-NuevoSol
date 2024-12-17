import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  registerUser,
  updatePassword,
  updateUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users", registerUser);
router.put("/users/:uid", updateUser);
router.put("/users/:uid/password", updatePassword);
router.delete("/users/:uid", deleteUser);
router.get("/users/:uid", getUser);

export default router;
