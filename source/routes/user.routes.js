import { UserController } from "../controller/user.controller.js";
import { Router } from "express";
import { userIdParamValidator, updateUserValidator } from "../validators/user.validator.js";
import { authMiddleware, adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all registered users. Only accessible by administrators.
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *       403:
 *         description: Forbidden - Admin access required.
 */
router.get("/", authMiddleware, adminOnly, userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 2dea3870-3704-48d6-a1a2-6023039980b4
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique UUID of the user.
 *     responses:
 *       200:
 *         description: User data found.
 *       404:
 *         description: User not found.
 */
router.get("/:id", authMiddleware, userIdParamValidator, userController.getUserById);

/**
 * @swagger
 * /api/users/email/{email}:
 *   get:
 *     summary: Get user by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         example: admin@example.com
 *         required: true
 *         schema:
 *           type: string
 *         description: The email address of the user.
 *     responses:
 *       200:
 *         description: User found successfully.
 *       404:
 *         description: No user matches that email.
 */
router.get("/email/:email", authMiddleware, userController.getUserByEmail);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 2dea3870-3704-48d6-a1a2-6023039980b4
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
router.put("/:id", authMiddleware, userIdParamValidator, updateUserValidator, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 2dea3870-3704-48d6-a1a2-6023039980b4
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 */
router.delete("/:id", authMiddleware, userIdParamValidator, userController.deleteUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user role (Admin Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 2dea3870-3704-48d6-a1a2-6023039980b4
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: User role updated successfully.
 */
router.patch("/:id", authMiddleware, adminOnly, updateUserValidator, userController.updateRole);

export default router;