import {body,param} from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';

export const validateProductId = [ 
param('id').isUUID().withMessage('Invalid product ID format'),
validateFields
]

export const validateUpdateProductData = [
    body('name')
    .trim()
    .optional()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 4, max: 100 }).withMessage('Name must be between 4 and 100 characters'),
    body('description')
    .trim()
    .optional()
    .isString().withMessage('Description must be a string')
    .isLength({ min: 10, max: 255 }).withMessage('Description must be between 10 and 255 characters'),
    body('price')
    .optional()
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('categoryId')
    .notEmpty().withMessage('Category ID is required')
    .isUUID().withMessage('Invalid category ID format'),
    body('slug')
    .trim()
    .optional()
    .notEmpty().withMessage('Slug is required')
    .isString().withMessage('Slug must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Slug must be between 3 and 100 characters'),
    body('stock')
    .notEmpty().withMessage('Stock is required')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be an integer greater than or equal to 0'),
    body('imagesUrl')
    .optional()
    .isArray().withMessage('Images URL must be an array of strings')
    .custom((arr) => arr.every(url => typeof url === 'string')).withMessage('Each image URL must be a string'),
    validateFields
]

export const validateProductData = [
    body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 4, max: 100 }).withMessage('Name must be between 4 and 100 characters'),
    body('description')
    .optional()
    .trim()
    .isString().withMessage('Description must be a string')
    .isLength({ min: 10, max: 255 }).withMessage('Description must be between 10 and 255 characters'),
    body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('categoryId')
    .notEmpty().withMessage('Category ID is required')
    .isUUID().withMessage('Invalid category ID format'),
    body('slug')
    .trim()
    .optional()
    .isString().withMessage('Slug must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Slug must be between 3 and 100 characters'),
    body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be an integer greater than or equal to 0'),
    body('imagesUrl')
    .optional()
    .isArray().withMessage('Images URL must be an array of strings')
    .custom((arr) => arr.every(url => typeof url === 'string')).withMessage('Each image URL must be a string'),
    validateFields
]

export const validateProductSlug = [
    param('slug')
    .trim()
    .notEmpty().withMessage('Slug is requires')
    .isString().withMessage('Slug must be a string'),
    validateFields
]


export const validateProductStockUpdate = [
    body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be an integer greater than or equal to 0'),
    validateFields
]