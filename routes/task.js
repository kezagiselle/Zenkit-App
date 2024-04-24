import express from 'express';
const taskRouter = express.Router();
import taskControllers from '../controllers/task.js';
import allValidations from '../utils/validation.js';
import setTime from '../middleware/time.js'

taskRouter.post('/addChecklist',taskControllers.addCheckListItem);
taskRouter.post('/add',setTime,allValidations.addTaskValidation,taskControllers.addTask);
taskRouter.post('/test',allValidations.testValidation,taskControllers.test);
taskRouter.get('/list',taskControllers.getTask);
taskRouter.put('/update/:id',taskControllers.updateTask);
taskRouter.put('/update',setTime,taskControllers.updateTask);
taskRouter.get('/findByTag/:Tag',taskControllers.findByTag);
taskRouter.get('/findById/:id',taskControllers.findById);
taskRouter.get('/findByParentId/:id',taskControllers.findByParentId);
taskRouter.get('/findByStatus/:status',taskControllers.findByStatus);
taskRouter.delete('/delete/:id',taskControllers.deleteTask)

export default taskRouter;