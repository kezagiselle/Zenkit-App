import express from 'express';
const taskRouter = express.Router();
import taskControllers from '../controllers/task.js';
import addTaskValidation from '../utils/validation.js';
import setTime from '../middleware/time.js'

taskRouter.get('/test',taskControllers.test);
taskRouter.post('/add',setTime,addTaskValidation,taskControllers.addTask);
taskRouter.get('/list',taskControllers.getTask);
taskRouter.put('/update/:id',taskControllers.updateTask);
taskRouter.delete('/delete/:id',taskControllers.deleteTask)

export default taskRouter;