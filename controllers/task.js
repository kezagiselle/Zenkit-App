import TaskModel from '../models/task.js'
import NotFoundError from '../Errors.js/NotFoundError.js';
import BadRequestError from '../Errors.js/BadRequestError.js';
import {validationResult} from 'express-validator';

const test = (req, res) => {
    res.send('Hello world')
}

const addTask = async (req, res, next) => {
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
   
}

const getTask = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({})
        res.status(200).json({ tasks })
    } catch (err) {
        next(err);
        //res.status(500).json({msg:error})
    }

}

const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const task = await TaskModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            return next(createCustomerError(`No task with id: ${task}`, 404))
        }
        res.status(200).json({ task })
    } catch (err) {
        next(err);
        //res.status(500).json({message:error})
    }


}
const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const task = await TaskModel.findByIdAndDelete(id)
        if (!task) {
            return next(createCustomerError(`No task with id ${task}`, 404))
        }
        res.status(200).json({ task })
    } catch (err) {
        next(err);
        //res.status(500).json({msg:error})
    }

}

const taskControllers = {
    test,
    addTask,
    getTask,
    updateTask,
    deleteTask,
}
export default taskControllers;