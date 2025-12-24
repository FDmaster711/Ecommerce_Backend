import {Router} from 'express';
import { ReviewController } from '../controller/review.controller.js';
import { authMiddleware, adminOnly } from '../middlewares/auth.middleware.js';
import { ValidateId,validateCreateReview,validateUpdateReview } from '../validators/review.validator.js';


const reviewController = new ReviewController();
const router = Router();

router.get('/', authMiddleware, reviewController.getAll);
router.post('/', authMiddleware, validateCreateReview(), reviewController.create);
router.put('/:id/update', authMiddleware,ValidateId(), validateUpdateReview(), reviewController.update);
router.delete('/:id/delete', authMiddleware, ValidateId(), reviewController.delete);

export default router;


