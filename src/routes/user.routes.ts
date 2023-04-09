import express from 'express';
export const router = express.Router()

// Get all users
router.get('/');
// Create a new user
router.post('/');
// Retrieve a single user with id
router.get('/:id');
// Update a user with id
router.put('/:id');
// Delete a user with id
router.delete('/:id');
