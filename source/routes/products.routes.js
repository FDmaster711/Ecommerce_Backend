import { Router } from 'express';
import { ProductController } from '../controller/product.controller.js';
import { authMiddleware, adminOnly } from '../middlewares/auth.middleware.js';
import {
    validateProductId,
    validateProductData,
    validateUpdateProductData,
    validateProductStockUpdate,
    validateProductSlug,
} from '../validators/product.validator.js';

const router = Router();
const productController = new ProductController();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     description: Retrieve a list of all available pizzas and items from the database.
 *     responses:
 *       200:
 *         description: A list of products was successfully retrieved.
 *       500:
 *         description: Internal server error.
 */
router.get('/', productController.getAll);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         example: aa38c793-9f5a-447c-a205-c3bcccc75894
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique UUID of the product
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get('/:id', validateProductId, productController.getById);

/**
 * @swagger
 * /api/products/slug/{slug}:
 *   get:
 *     summary: Get product by slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         example: hawaiana-pizza
 *         required: true
 *         schema:
 *           type: string
 *         description: URL-friendly name of the product
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product with this slug not found
 */
router.get('/slug/:slug', validateProductSlug, productController.getBySlug);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product (Admin Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: aa38c793-9f5a-447c-a205-c3bcccc75894
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put(
    '/:id',
    authMiddleware,
    adminOnly,
    validateProductId,
    validateUpdateProductData,
    productController.update
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: aa38c793-9f5a-447c-a205-c3bcccc75894
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/:id', authMiddleware, adminOnly, validateProductId, productController.delete);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Margherita Pizza"
 *               price:
 *                 type: number
 *                 example: 12.50
 *               stock:
 *                 type: integer
 *                 example: 50
 *               slug:
 *                 type: string
 *                 example: "margherita-pizza"
 *               categoryId:
 *                 type: string
 *                 example: "3c6d5e11-fa13-4eef-92a0-7aee7676de13"
 *     responses:
 *       201:
 *         description: Product created successfully
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/', authMiddleware, adminOnly, validateProductData, productController.create);

/**
 * @swagger
 * /api/products/{id}/stock:
 *   patch:
 *     summary: Update product stock (Admin Only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: aa38c793-9f5a-447c-a205-c3bcccc75894
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
 *               stock:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       200:
 *         description: Stock updated successfully
 */
router.patch(
    '/:id/stock',
    authMiddleware,
    adminOnly,
    validateProductId,
    validateProductStockUpdate,
    productController.updateStock
);

export default router;