import {body,param} from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';

export const userIdParamValidator = [
    param('id')
    .isUUID().withMessage('Invalid user ID format')
    .notEmpty().withMessage('User ID is required'),
    validateFields
]

export const updateUserValidator = [
    body('name')
        .optional()
        .trim()
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
    body('email')
        .optional()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateFields
]