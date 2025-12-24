import {body, param} from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';

export const validateCategoryId = [
    param('id').isUUID().withMessage('Invalid category ID format'),
    validateFields

];

export const validateCategoryData = [
    body('name')
         .trim()
         .escape()
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ max: 100 }).withMessage('Name can have a maximum of 100 characters')
        .isLength({ min: 3 }).withMessage('Name must have at least 3 characters'),
    body('description')
        .optional()
        .trim()
        .escape()
        .isString().withMessage('Description must be a string')
        .isLength({ min: 10 }).withMessage('Description must have at least 10 characters')
        .isLength({ max: 255 }).withMessage('Description can have a maximum of 255 characters'),
    validateFields
];
