import { AuthController } from "../controller/auth.controller.js";
import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
const authController = new AuthController();

router.post("/register", registerValidator, authController.Register);
router.post("/login", loginValidator, authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getMe);
router.post("/logout", authMiddleware, authController.logout);
router.put("/change-password", authMiddleware, authController.changePassword);

export default router;