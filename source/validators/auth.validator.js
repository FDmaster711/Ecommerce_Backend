import {body} from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';

export const registerValidator = [
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('name')
        .optional({ values: 'falsy' }) 
        .trim()
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
    
    validateFields
]

export const loginValidator = [
    body('email')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validateFields
]