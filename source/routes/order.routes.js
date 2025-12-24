import { OrderController } from "../controller/order.controller.js";
import { Router } from 'express';
import { authMiddleware, adminOnly } from '../middlewares/auth.middleware.js';
import { ValidateId, validateCancel, validateCreate, validateStatus } from "../validators/order.validator.js";

const router = Router();
const orderController = new OrderController();

/**
 * @swagger
 * /api/orders/user:
 *   get:
 *     summary: Get all orders for the current user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all orders placed by the authenticated user.
 *     responses:
 *       200:
 *         description: List of user orders retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get('/user', authMiddleware, orderController.getByUser);

/**
 * @swagger
 * /api/orders/{id}/user:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique UUID of the order.
 *     responses:
 *       200:
 *         description: Order details found.
 *       404:
 *         description: Order not found for this user.
 */
router.get('/:id/user', authMiddleware, ValidateId(), orderController.getById);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin Only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a complete list of all orders in the system.
 *     responses:
 *       200:
 *         description: All orders retrieved successfully.
 *       403:
 *         description: Forbidden - Admin access required.
 */
router.get('/', authMiddleware, adminOnly, orderController.getAll);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - items
 *             properties:
 *               address:
 *                 type: string
 *                 example: "Av. Los Leones, Res. Las Flores, Barquisimeto"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: "uuid-v4-product-id"
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully.
 *       400:
 *         description: Invalid input or insufficient stock.
 */
router.post('/', authMiddleware, validateCreate(), orderController.create);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status (Admin Only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               status:
 *                 type: string
 *                 enum: [PENDING, COMPLETED, CANCELLED]
 *                 example: "COMPLETED"
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 */
router.patch('/:id/status', authMiddleware, ValidateId(), validateStatus(), adminOnly, orderController.updateStatus);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully.
 *       400:
 *         description: Order cannot be cancelled (e.g., already completed).
 */
router.patch('/:id/cancel', authMiddleware, validateCancel(), ValidateId(), validateStatus(), orderController.cancel);

export default router;