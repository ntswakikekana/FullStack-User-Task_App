import express from 'express';
import {
  getUsers,
  createUser,
  getUserTasks,
  createTaskForUser
} from '../controllers/userController';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id/tasks', getUserTasks);
router.post('/users/:id/tasks', createTaskForUser);

export default router;