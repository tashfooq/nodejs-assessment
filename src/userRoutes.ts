import express, { Router } from "express";
import { createUser, getAllUsers } from "./userController";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export default router;
