import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', replaceUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
