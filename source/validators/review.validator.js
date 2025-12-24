import {body,param} from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';


export const ValidateId = () => [
    param('id')
        .isUUID().withMessage('Invalid review ID format'),
    validateFields
];

export const validateCreateReview = () => [
    body('productId')
        .notEmpty().withMessage('Product ID is required')
        .isUUID().withMessage('Invalid product ID format'),
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    body('comment')
        .optional()
        .isString().withMessage('Comment must be a string')
        .isLength({ max: 1000 }).withMessage('Comment can have a maximum of 1000 characters'),
    validateFields
];

export const validateUpdateReview = () => [
    param('id')
        .isUUID().withMessage('Invalid review ID format'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    body('comment')
        .optional()
        .isString().withMessage('Comment must be a string')
        .isLength({ max: 1000 }).withMessage('Comment can have a maximum of 1000 characters'),
    validateFields
];