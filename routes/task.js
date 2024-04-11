import express from 'express';
const taskRouter = express.Router();
import taskControllers from '../controllers/task.js';

taskRouter.get('/test',taskControllers.test);
taskRouter.post('/add',taskControllers.setTime,taskControllers.addTask);
taskRouter.get('/list',taskControllers.getTask);
taskRouter.put('/update/:id',taskControllers.updateTask);
taskRouter.delete('/delete/:id',taskControllers.deleteTask)

export default taskRouter;