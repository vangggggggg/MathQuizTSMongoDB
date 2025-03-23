import express from "express";
import { UserController } from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.getUsers);
router.post("/create", UserController.createUser);
router.post("/login", UserController.loginUser)

export default router;
