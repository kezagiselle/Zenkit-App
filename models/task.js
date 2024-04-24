import mongoose from 'mongoose'
import {model, Schema} from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Todo","Progress","Completed","Late","Over-due"],
            message: "{VALUE} is not a valid status",
        },
        // default: "Todo"
    },
    parentTask: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: false
    }],
    checkList: [{
        name: {
            type: String,
            required: true,
        },
        checked: {
            type: Boolean,
            required: true,
            default: false
        }
    }],
    workload: {
        type: Number,
        required: true
    },
    dueDate: {
        startDate: {
            type: Date,
            required: false,
        },
        endDate: {
            type: Date,
            required: false,
        },
        startTime: {
            type: String,
            required: false,
        },
        endTime: {
            type: String,
            required: false,
        },
        duration: {
            type: Number,
            required: false,
        },
        durationType:{
                type: String,
                required: false,
                enum: {
                    values: ["Minutes","Hours","Days","Weeks","Months"],
                    message: "{VALUES} is not a valid duration type",
                },
            }
              //default: "Days"
        }
});

const TaskModel = mongoose.model("Task",taskSchema)
export default TaskModel;