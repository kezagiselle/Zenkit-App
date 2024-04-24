import taskRouter from './router/task.js';
import express from 'express';
const router = express.Router();
import tagRouter from './tag.js';
import userRouter from './user.js';

router.use('/tasks',taskRouter);
router.use('/tags',tagRouter);
router.use('/signUp', userRouter);
router.use('/signIn', userRouter);
export default allRoutes;