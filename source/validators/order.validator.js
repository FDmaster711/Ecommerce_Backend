
import { body, param } from 'express-validator';
import { validateFields } from '../middlewares/validate.middleware.js';

export const ValidateId = () => [
  param('id').isUUID().withMessage('Invalid order ID format'),
  validateFields
];

export const validateCreate = () => [
  body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
  body('items.*.productId').isUUID().withMessage('Invalid product ID in items'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Item quantity must be >= 1'),
  body('address').notEmpty().withMessage('Address is required'),
  validateFields
];

export const validateStatus = () => [
  param('id').isUUID().withMessage('Invalid order ID format'),
  body('newStatus').isIn(['PENDING','PAID','SHIPPED','DELIVERED','CANCELLED']).withMessage('Invalid status'),
  validateFields
];

export const validateCancel = () => [
  param('id').isUUID().withMessage('Invalid order ID format'),
  validateFields
];
