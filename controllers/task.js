import TaskModel from '../models/task.js'
const test = (req,res) => {
    res.send('Hello world')
}

const setTime = async (req,res,next) => {
    console.log(req.body.dueDate);
    var startTime = "";
    var endTime = "";
    if(req.body.dueDate.startDate){
        startTime = new Date(req.body.dueDate.startDate).toLocaleTimeString();
    }
    if(req.body.dueDate.endDate){
        endTime = new Date(req.body.dueDate.endDate).toLocaleTimeString();
    }
    

    if(req.body.dueDate.startDate && req.body.dueDate.endDate){
        const startDate = new Date(req.body.dueDate.startDate);
        const endDate = new Date(req.body.dueDate.endDate)
;
    // calculate the difference btn in milliseconds
      const diff = endDate.getTime() - startDate.getTime();

      // convert time difference into days , hours and minutes
      const days = Math.floor(diff / (1000 * 3600 * 24));
      const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
      const minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));

      //store duration in hours and minutes
      const durationInMinutes = days * 24 * 60 + hours * 60 + minutes;

      req.body.dueDate.startTime = startTime;
      req.body.dueDate.endTime = endTime;
     req.body.dueDate.duration = durationInMinutes;
      res.send(req.body.dueDate);
    next();
    }
}



const addTask = async(req,res,next) => {
    try{
        const newTask = await TaskModel.create(req.body)
        console.log(req.body)
        return res.status(201).json({newTask})
    } catch (err) {
        res.status(500).json({err});
        //return res.status(500).json({message:error})
    }
    next();
}

const getTask = async (req,res,next) => {
    try{
        const tasks = await TaskModel.find({})
        res.status(200).json({tasks})
    } catch (err){
        next(err);
        //res.status(500).json({msg:error})
    }

}

const updateTask = async (req,res,next) => {
    try {
        const id = req.params.id
        const task = await TaskModel.findByIdAndUpdate(id,req.body,{
            new: true,
            runValidators: true
        })
        if(!task){
            return next(createCustomerError(`No task with id: ${task}`,404))
        }
        res.status(200).json({task})
    } catch (err){
        next(err);
        //res.status(500).json({message:error})
    }


}
const deleteTask = async (req,res,next) => {
    try {
        const id = req.params.id
        const task = await TaskModel.findByIdAndDelete(id)
        if(!task){
            return next(createCustomerError(`No task with id ${task}`,404))
        }
        res.status(200).json({task})
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
    setTime
}
export default taskControllers;