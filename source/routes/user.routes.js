import { UserController } from "../controller/user.controller.js";
import {Router} from 'express';
import { userIdParamValidator, updateUserValidator } from "../validators/user.validator.js";
import { authMiddleware, adminOnly } from "../middlewares/auth.middleware.js";


const router = Router();
const userController = new UserController();

router.get('/', authMiddleware, adminOnly, userController.getAllUsers);
router.get('/:id', authMiddleware, userIdParamValidator, userController.getUserById);
router.get('/email/:email', authMiddleware, userController.getUserByEmail);
router.put('/:id', authMiddleware, userIdParamValidator, updateUserValidator, userController.updateUser);
router.delete('/:id', authMiddleware, userIdParamValidator, userController.deleteUser);
router.patch('/:id', authMiddleware, adminOnly, updateUserValidator, userController.updateRole);

export default router;