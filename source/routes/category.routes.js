import { Router } from "express";
import { CategoryController } from "../controller/category.controller.js";
import { validateCategoryId, validateCategoryData } from "../validators/category.validator.js";

const router = Router();
const categoryController = new CategoryController();

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     description: Retrieve a list of all product categories (e.g., Pizzas, Drinks).
 *     responses:
 *       '200':
 *         description: List of categories retrieved successfully.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", categoryController.getAll);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 4629fe85-27d9-43f3-8756-3e7172d96442
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique UUID of the category.
 *     responses:
 *       '200':
 *         description: Category found.
 *       '404':
 *         description: Category not found.
 */
router.get("/:id", validateCategoryId, categoryController.getById);

/**
 * @swagger
 * /api/categories/name/{name}:
 *   get:
 *     summary: Get category by name
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: name
 *         example: Pizzas
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the category to search for.
 *     responses:
 *       '200':
 *         description: Category found successfully.
 *       '404':
 *         description: No category matches that name.
 */
router.get("/name/:name",  categoryController.getByName);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
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
 *                 example: "Pizzas"
 *     responses:
 *       '201':
 *         description: Category created successfully.
 *       '401':
 *         description: Unauthorized.
 */
router.post("/", validateCategoryData, categoryController.create);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 4629fe85-27d9-43f3-8756-3e7172d96442
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
 *                 example: "Beverages"
 *     responses:
 *       '200':
 *         description: Category updated successfully.
 */
router.put("/:id", validateCategoryData, validateCategoryId, categoryController.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: 4629fe85-27d9-43f3-8756-3e7172d96442
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category deleted successfully.
 */
router.delete("/:id", validateCategoryId, categoryController.delete);

export default router;