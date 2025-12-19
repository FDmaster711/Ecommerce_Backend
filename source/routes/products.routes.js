import {Router} from 'express';
import { ProductController } from '../controller/product.controller.js';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getAll);


export default router