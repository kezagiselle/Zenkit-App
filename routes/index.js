import taskRouter from './router/task.js';
import express from 'express';
const router = express.Router();

router.use('/tasks',taskRouter);

export default router;