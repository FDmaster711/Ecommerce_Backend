import { OrderController } from "../controller/order.controller.js";
import {Router} from 'express';
import { authMiddleware, adminOnly } from '../middlewares/auth.middleware.js';
import { ValidateId, validateCancel, validateCreate, validateStatus } from "../validators/order.validator.js";


const router = Router();
const orderController = new OrderController();

router.get('/user', authMiddleware, orderController.getByUser);
router.get('/:id/user', authMiddleware, ValidateId(), orderController.getById );
router.get('/',authMiddleware, adminOnly, orderController.getAll);
router.post('/', authMiddleware, validateCreate(), orderController.create);
router.patch('/:id/status', authMiddleware, ValidateId(), validateStatus(), adminOnly, orderController.updateStatus);
router.patch('/:id/cancel', authMiddleware, ValidateId(), validateStatus(), orderController.cancel)


 

export default router