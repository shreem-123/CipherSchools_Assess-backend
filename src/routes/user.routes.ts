import express from 'express';
export const router = express.Router()
import { findAll } from '../controllers/user.controller';

// Get all users
router.get('/', findAll);
// Create a new user
router.post('/');
// Retrieve a single user with id
router.get('/:id');
// Update a user with id
router.put('/:id');
// Delete a user with id
router.delete('/:id');
