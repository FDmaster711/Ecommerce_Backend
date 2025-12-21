import {Router} from 'express';
import { ProductController } from '../controller/product.controller.js';
import { authMiddleware, adminOnly } from '../middlewares/auth.middleware.js';
import { validateProductId, validateProductData, validateUpdateProductData, validateProductStockUpdate, validateProductSlug } from '../validators/product.validator.js';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAll);
router.get('/:id', validateProductId, productController.getById);
router.get('/slug/:slug', validateProductSlug, productController.getBySlug);
router.put('/:id', authMiddleware, adminOnly, validateProductId, validateUpdateProductData, productController.update);
router.delete('/:id', authMiddleware, adminOnly, validateProductId, productController.delete);
router.post('/', authMiddleware, adminOnly, validateProductData, productController.create);
router.patch('/:id/stock', authMiddleware, adminOnly, validateProductId, validateProductStockUpdate, productController.updateStock);


export default router