import TaskModel from '../models/task.js'
import NotFoundError from '../Errors.js/NotFoundError.js';
import BadRequestError from '../Errors.js/BadRequestError.js';
import {validationResult} from 'express-validator';
import asyncWrapper from '../middleware/async.js';

const test = asyncWrapper((req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return next(new BadRequestError(errors.array()[0].msg));
    }
    res.status(200).json({
       message:'Hello world'
    });
});

const addTask = asyncWrapper(async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if(!errors.isEmpty()){
        next(new BadRequestError(errors.array()[0].msg));
        }
        const newTask = await TaskModel.create(req.body)
        console.log(req.body)
        return res.status(201).json({ newTask })
    } catch (err) {
        next(err);
        //res.status(500).json({ err });
        //return res.status(500).json({message:error})
    }
   
});

const getTask = asyncWrapper(async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({}).populate('tags');
        if(tasks){
            return res.status(200).json({
                nbHits: tasks.length,
                tasks
            });
        }
    } catch (err){
        next(err);
    }
});

const addCheckListItem = asyncWrapper(async (req, res, next) => {
    const taskId = req.query.id;
    const item = req.body;

    const taskBeforeUpdate = await TaskModel.findById(taskId);
    const checkListItems = taskBeforeUpdate.checkList;
    checkListItems.push(item);

    const updatedTask = await TaskModel.findByIdAndUpdate(
        taskId, 
        { checkList: checkListItems }, 
        { new: true }
    ).populate("tags");

    if (!updatedTask) {
        return next(new NotFoundError(`Task not found`));
    };

    return res.status(200).json(updatedTask);    
});

const updateCheckListItem = asyncWrapper(async (req, res, next) => {
    const taskId = req.query.id;
    const checkListItem = req.query.item;
    const update = req.body;

    const taskBeforeUpdate = await TaskModel.findById(taskId);
    const checkListItems = taskBeforeUpdate.checkList;

    checkListItems.forEach(item => {
        if (item._id.toString() === checkListItem && !update.name) {
            item.checked = !item.checked;
        } else if (item._id.toString() === checkListItem && update.name) {
            item.name = update.name;
        }
    });
    
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, { checkList: checkListItems }, { new: true });
    if (!updatedTask) {
        return next(new NotFoundError(`Task not found`));
    };
    
    return res.status(200).json(updatedTask);    
});

const updateTask = asyncWrapper(async(req,res,next) =>{
    const taskId = req.query.id;
    const updates = req.body;

    if (updates.tags) {
        const taskBeforeUpdate = await TaskModel.findById(taskId);
        let tags = [];
        taskBeforeUpdate.tags.forEach(tag => {
            tags.push(tag.toString());
        })
        tags.push(updates.tags[0]);
        updates.tags = tags;
    }
    if (updates.tags) {
        const taskBeforeUpdate = await TaskModel.findById(taskId);
        let checkListItems = [];
        taskBeforeUpdate.checkList.forEach(item => {
            checkListItems.push(item.toString());
        })
        checkListItems.push(updates.checkList[0]);
        updates.checkList = checkListItems;
    }
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
    if (!updatedTask) {
        return next(new NotFoundError(`Task not found`));
    }
    return res.status(200).json(updatedTask);
});
const findById = asyncWrapper(async (req, res, next) => {
    const taskId = req.query.id;
    const foundTask = await TaskModel.findById(taskId).populate('tags')
    if (!foundTask) {
        return next(new NotFoundError(`Task not found`));
    }
    return res.status(200).json(foundTask);
});
const findByStatus = asyncWrapper(async (req, res, next) => {
    const taskStatus = req.query.status;

    const foundTasks = await TaskModel.find({ status: taskStatus });
    return res.status(200).json({
        nbHits: foundTasks.length,
        foundTasks
    });
});
const findByParentId = asyncWrapper(async (req, res, next) => {
    const parentId = req.query.parent;

    const foundTasks = await TaskModel.find({ parentTask: parentId });
    return res.status(200).json({
        nbHits: foundTasks.length,
        foundTasks
    });
});
const findByTag = asyncWrapper(async (req, res, next) => {
    const tagId = req.query.tag;

    const allTasks = await TaskModel.find({});
    const foundTasks = [];
    allTasks.forEach(task => {
        if (task.tags.includes(tagId)) {
            foundTasks.push(task);
        }
    });

    return res.status(200).json({
        nbHits: foundTasks.length,
        foundTasks
    })
});
// const updateTask = asyncWrapper(async (req, res, next) => {
//         const id = req.params.id
//         const task = await TaskModel.findByIdAndUpdate(id, req.body, {
//             new: true,
//             runValidators: true
//         })
//         if (!task) {
//             return next(createCustomerError(`No task with id: ${task}`, 404))
//         }
//         res.status(200).json({ task })
// });
const deleteTask = asyncWrapper(async (req, res, next) => {
        const id = req.params.id
        const task = await TaskModel.findByIdAndDelete(id)
        if (!task) {
            return next(createCustomerError(`No task with id ${task}`, 404))
        }
        res.status(200).json({ task })    
});

const taskControllers = {
    test,
    addTask,
    getTask,
    updateTask,
    deleteTask,
    addCheckListItem,
    updateCheckListItem,
    findById,
    findByStatus,
    findByParentId,
    findByTag
}
export default taskControllers;