import express from 'express';
import Joi from 'joi';
import { validate } from '../middleware/validator.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Validation schemas
const createExampleSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(200),
  status: Joi.string().valid('active', 'inactive').default('active'),
});

const updateExampleSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string().max(200),
  status: Joi.string().valid('active', 'inactive'),
});

/**
 * @route   GET /api/v1/examples
 * @desc    Get all examples
 * @access  Public
 */
router.get('/', async (req, res) => {
  // Example: Fetch from database
  const examples = [
    { id: '1', name: 'Example 1', status: 'active', createdAt: new Date() },
    { id: '2', name: 'Example 2', status: 'inactive', createdAt: new Date() },
  ];

  res.status(200).json({
    success: true,
    count: examples.length,
    data: examples,
  });
});

/**
 * @route   GET /api/v1/examples/:id
 * @desc    Get example by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Example: Fetch from database
  const example = { id, name: 'Example 1', status: 'active', createdAt: new Date() };

  if (!example) {
    throw new AppError('Example not found', 404);
  }

  res.status(200).json({
    success: true,
    data: example,
  });
});

/**
 * @route   POST /api/v1/examples
 * @desc    Create new example
 * @access  Public
 */
router.post('/', validate(createExampleSchema), async (req, res) => {
  const { name, description, status } = req.body;

  // Example: Save to database
  const newExample = {
    id: Date.now().toString(),
    name,
    description,
    status,
    createdAt: new Date(),
  };

  res.status(201).json({
    success: true,
    data: newExample,
  });
});

/**
 * @route   PUT /api/v1/examples/:id
 * @desc    Update example by ID
 * @access  Public
 */
router.put('/:id', validate(updateExampleSchema), async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Example: Update in database
  const updatedExample = {
    id,
    ...updates,
    updatedAt: new Date(),
  };

  res.status(200).json({
    success: true,
    data: updatedExample,
  });
});

/**
 * @route   DELETE /api/v1/examples/:id
 * @desc    Delete example by ID
 * @access  Public
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Example: Delete from database
  // await Example.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: `Example with ID ${id} deleted successfully`,
  });
});

export default router;
