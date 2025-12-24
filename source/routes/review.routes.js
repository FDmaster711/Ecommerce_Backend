import { Router } from 'express';
import { ReviewController } from '../controller/review.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { ValidateId, validateCreateReview, validateUpdateReview } from '../validators/review.validator.js';

const reviewController = new ReviewController();
const router = Router();

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all reviews, including user and product details.
 *     responses:
 *       200:
 *         description: Successfully retrieved all reviews.
 *       401:
 *         description: Unauthorized - Valid token required.
 */
router.get('/', authMiddleware, reviewController.getAll);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - productId
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               productId:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               comment:
 *                 type: string
 *                 example: "Best pizza in Barquisimeto! Highly recommended."
 *     responses:
 *       201:
 *         description: Review created successfully.
 *       400:
 *         description: Invalid input data.
 */
router.post('/', authMiddleware, validateCreateReview(), reviewController.create);

/**
 * @swagger
 * /api/reviews/{id}/update:
 *   put:
 *     summary: Update an existing review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the review to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Updating my review: still good, but delivery was a bit slow today."
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *       403:
 *         description: Forbidden - You can only update your own reviews.
 *       404:
 *         description: Review not found.
 */
router.put('/:id/update', authMiddleware, ValidateId(), validateUpdateReview(), reviewController.update);

/**
 * @swagger
 * /api/reviews/{id}/delete:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the review to delete.
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       403:
 *         description: Forbidden - You can only delete your own reviews (unless you are an Admin).
 *       404:
 *         description: Review not found.
 */
router.delete('/:id/delete', authMiddleware, ValidateId(), reviewController.delete);

export default router;