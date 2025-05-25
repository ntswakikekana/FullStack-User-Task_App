import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Get all users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const newUser = await prisma.user.create({ data: { name } });
  res.status(201).json(newUser);
};

// Get tasks for a user
export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  const tasks = await prisma.task.findMany({ where: { userId } });
  res.json(tasks);
};

// Create task for a user
export const createTaskForUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
  const { title } = req.body;

  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  if (!title) {
    res.status(400).json({ error: "Task title is required" });
    return;
  }

  const task = await prisma.task.create({
    data: { title, userId }
  });
  res.status(201).json(task);
};
